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
        'color': '#766c6b',
        'start': 0,
        'end': 899
      },
      // green
      {
        'color': '#73c733',
        'start': 900,
        'end': 1199
      },
      // blue
      {
        'color': '#393c9c',
        'start': 1200,
        'end': 1499
      },
      // yellow
      {
        'color': '#e0d739',
        'start': 1500,
        'end': 2199
      },
      // red
      {
        'color': '#e04939',
        'start': 2200,
        'end': Infinity
      }
    ];
    var w       = 600,
        h       = 350,
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
                       .domain([0, d3.max(ranges, function(range) { return range.number })])
                       .range([h - padding, 0]);
        var xScale2 = d3.scale.linear()
                        .domain([0, d3.max(ranges, function(range) { return range.end })])
                        .range([padding, w]);
        var svg = d3.select('div.distribution-graph')
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h);

        svg.selectAll('rect')
           .data(ranges)
           .enter()
           .append('rect')
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
             $scope.displayCoders = true;
             $scope.numCoders = d.number;
             $scope.$digest();
           })
           .on('mouseout', function(d) {
             $scope.displayCoders = false;
             $scope.$digest();
           })

        var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient('bottom')
                      .ticks(ranges.length);

        var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient('left')
                      .ticks(5);

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

        svg.append('g')
           .attr('class', 'axis')
           .attr('transform', 'translate(' + padding + ',0)')
           //.attr('transform', 'rotate(180)')
           .call(yAxis);

        svg.selectAll('line')
           .data(ranges)
           .enter()
           .append('rect')

        svg.append('line')
           .attr('x1', xScale2($scope.rating))
           .attr('y1', h - padding)
           .attr('x2', xScale2($scope.rating))
           .attr('y2', 0)
           .attr('stroke-width', 2)
           .attr('stroke', ratingToColor($scope.colors, $scope.rating));

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
      for (var i = 0; i < ranges.length; i++) {
        if (ranges[i].number > 0) return;
        else ranges.shift();
      }
    }

    function removeTrailingZeroes(ranges) {
      for (var i = ranges.length - 1; i >= 0; i--) {
        if (ranges[i].number > 0) return;
        else ranges.pop();
      }
    }

    function ratingToColor(colors, rating) {
      colors = colors.filter(function(color) {
        return rating >= color.start && rating <= color.end;
      });
      return colors[0] && colors[0].color || 'black';
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
