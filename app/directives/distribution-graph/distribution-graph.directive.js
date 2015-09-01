(function() {
  'use strict';

  angular.module('tcUIComponents').directive('distributionGraph', distributionGraph);

  function distributionGraph() {
    return {
      restrict: 'E',
      templateUrl: function(elem, attrs) {
        return 'directives/distribution-graph/distribution-graph.directive.html';
      },
      scope: {
        promise: '=',
        rating: '='
      },
      controller: ['$scope', DistributionGraphController]
    };
  }

  function DistributionGraphController($scope) {
    $scope.colors = [
      // grey
      {
        'color': '#7f7f7f',
        'darkerColor': '#656565',
        'start': 0,
        'end': 899
      },
      // green
      {
        'color': '#99cc09',
        'darkerColor': '#7aa307',
        'start': 900,
        'end': 1199
      },
      // blue
      {
        'color': '#09affe',
        'darkerColor': '#078ccb',
        'start': 1200,
        'end': 1499
      },
      // yellow
      {
        'color': '#f39426',
        'darkerColor': '#c2761e',
        'start': 1500,
        'end': 2199
      },
      // red
      {
        'color': '#fe0866',
        'darkerColor': '#cb0651',
        'start': 2200,
        'end': Infinity
      }
    ];
    var w       = 700,
        h       = 400,
        padding = 100;

    activate();

    function activate() {
      $scope.displayCoders = false;
      $scope.numCoders = 100;
      $scope.promise.then(function(data) {
        $scope.distribution = data.distribution;
        var ranges = getRanges($scope.distribution);
        removeLeadingZeroes(ranges);
        removeTrailingZeroes(ranges);
        var xScale = d3.scale.ordinal()
                       .domain(d3.range(ranges.length))
                       .rangeRoundBands([padding, w], 0.05);
        var yScale = d3.scale.linear()
                       .domain([0, d3.max(ranges, function(range) { return range.number }) + 1])
                       .range([h - padding, 0]);
        var xScale2 = d3.scale.linear()
                        .domain([ranges[0].start,
                                d3.max(ranges, function(range) { return range.end })])
                        .range([padding, w]);
        var svg = d3.select('div.distribution-graph')
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h);

        svg.append('rect')
           .attr('x', padding)
           .attr('y', 0)
           .attr('width', w)
           .attr('height', h - padding)
           .attr('fill', '#eeeeee')

        svg.append('g')
           .attr('class', 'grid')
           .attr('transform', 'translate(' + padding + ',0)')
           .call(
             yAxis(5).tickSize(-w, 0, 0)
                    .tickFormat('')
           )

        svg.append('g')
           .attr('class', 'axis')
           .attr('transform', 'translate(' + padding + ',0)')
           .call(yAxis(5))


        svg.append('line')
           .attr('x1', xScale2($scope.rating))
           .attr('y1', h - padding)
           .attr('x2', xScale2($scope.rating))
           .attr('y2', 0)
           .attr('class', 'my-rating')
           .attr('stroke-width', 2)
           .attr('stroke', ratingToColor($scope.colors, $scope.rating));

        svg.selectAll('rect.bar')
           .data(ranges)
           .enter()
           .append('rect')
           .attr('class', 'bar')
           .attr('x', function(d, i) {
             return xScale(i);
           })
           .attr('y', function(d) {
             return yScale(d.number);
           })
           .attr('width', xScale.rangeBand())
           .attr('height', function(d) {
             return h - padding - yScale(d.number);
           })
           .attr('fill', function(d) {
             return ratingToColor($scope.colors, d.start);
           })
           .on('mouseover', function(d) {
             d3.select(this)
               .attr('fill', ratingToDarkerColor($scope.colors, d.start));
             $scope.displayCoders = true;
             $scope.numCoders = d.number;
             $scope.$digest();
           })
           .on('mouseout', function(d) {
             d3.select(this)
               .attr('fill', ratingToColor($scope.colors, d.start));
             $scope.displayCoders = false;
             $scope.$digest();
           })

        svg.selectAll('line.xaxis')
           .data(ranges)
           .enter()
           .append('line')
           .attr('class', 'xaxis')
           .attr('x1', function(d, i) {
             if (i === 0) {
               return padding;
             } else {
               return xScale(i) - .5;
             }
           })
           .attr('x2', function(d, i) {
             if (i === ranges.length - 1) {
               return w;
             } else {
               return xScale(i) + xScale.rangeBand() + .5;
             }
           })
           .attr('y1', h - padding + .5)
           .attr('y2', h - padding + .5)
           .attr('stroke', function(d) {
             return ratingToColor($scope.colors, d.start);
           })

        var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient('bottom')
                      .ticks(ranges.length);

        function yAxis(ticks) {
          return d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .ticks(ticks);
        }

        svg.append('g')
           .attr('class', 'axis')
           .attr('transform', 'translate(0,' + (h - padding) + ')')
           .call(xAxis)
           .selectAll('text')
           .attr('x', 9)
           .attr('y', 0)
           .attr('dy', '.35em')
           .attr('transform', 'rotate(90)')
           .style('text-anchor', 'start')
           .text(function(d, i) {
             var range = ranges[i];
             return range.start + ' - ' + range.end;
           });

      });

    }

    function getRanges(distribution) {
      var ranges = [];
      for (var range in distribution) {
        ranges.push({
          'name': range,
          'number': distribution[range],
          'start': getRangeStart(range),
          'end': getRangeEnd(range)
        });
      }
      ranges.sort(function(a, b) {
        return a.start - b.start;
      });
      return ranges;
    }

    function getRangeStart(range) {
      return parseInt(
        range.match(/\d+/)[0]
      );
    }

    function getRangeEnd(range) {
      return parseInt(
        range.match(/To(\d+)/)[1]
      );
    }

    function removeLeadingZeroes(ranges) {
      while(ranges[0].number == 0) {
        ranges.shift(); 
      }
    }

    function removeTrailingZeroes(ranges) {
      while (ranges[ranges.length - 1].number == 0) {
        ranges.pop();
      }
    }

    function ratingToColor(colors, rating) {
      colors = colors.filter(function(color) {
        return rating >= color.start && rating <= color.end;
      });
      return colors[0] && colors[0].color || 'black';
    }

    function ratingToDarkerColor(colors, rating) {
      colors = colors.filter(function(color) {
        return rating >= color.start && rating <= color.end;
      });
      return colors[0] && colors[0].darkerColor || 'black';
    }
    
    // TODO: delete because this is probably unnecessary
    function ratingToRange(ranges, rating) {
      var ans =  ranges.filter(function(range) {
        return rating >= range.start && rating <= range.end;
      });
      if (ans.length == 1) return ans[0].name;
      else return 'ratingRange0To099';
    }
  }

})();
