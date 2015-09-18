(function() {
  'use strict';

  angular.module('tcUIComponents').directive('historyGraph', historyGraph);

  function historyGraph() {
    return {
      restrict: 'E',
      templateUrl: function(elem, attrs) {
        return 'directives/history-graph/history-graph.directive.html';
      },
      scope: {
        promise: '=',
        rating: '=',
        graphState: '='
      },
      controller: ['$scope', HistoryGraphController]
    };
  }

  function HistoryGraphController($scope) {
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
    var measurements = {
      w: 600,
      h: 400,
      padding: {
        top: 20,
        right: 5,
        bottom: 100,
        left: 50
      }
    };

    var mobileMeasurements = {
      w: 300,
      h: 200,
      padding: {
        top: 10,
        right: 30,
        bottom: 100,
        left: 30
      }
    };

    var desktop = window.innerWidth >= 900 && true;

    $scope.promise.then(function(history) {
      $scope.history = history;

      var parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse;

      history.forEach(function(d) {
        d.ratingDate = parseDate(d.ratingDate);
      });

      draw(desktop ? measurements : mobileMeasurements, history);
    });

    d3.select(window).on('resize.history', resize);

    function resize() {
      if (window.innerWidth < 900 && desktop) {
        d3.select('.history-graph svg').remove();
        draw(mobileMeasurements, $scope.history);
        desktop = false;
      } else if (window.innerWidth >= 900 && !desktop) {
        d3.select('.history-graph svg').remove();
        draw(measurements, $scope.history);
        desktop = true;
      }
    }

    function draw(measurements, history) {
      if (!history) return;

      var w       = measurements.w,
          h       = measurements.h,
          padding = measurements.padding;

      var totalH = h + padding.top + padding.bottom;
      var totalW = w + padding.left + padding.right;

      var x = d3.time.scale()
                .range([padding.left + 5, w + padding.left - 5])
                .domain(d3.extent(history, function(d) { return d.ratingDate; }));

      var y = d3.scale.linear()
                .range([h + padding.top - 5, padding.top + 5])
                .domain(d3.extent(history, function(d) { return d.newRating; }));


      function yAxis(ticks) {
        return d3.svg.axis()
                 .scale(y)
                 .ticks(ticks || 10)
                 .orient("left");
      }

      function xAxis(ticks) {
        return d3.svg.axis()
                 .scale(x)
                 .ticks(ticks || 10)
                 .orient("bottom");
      }

      var line = d3.svg.line()
                   .interpolate('cardinal')
                   .x(function(d) { return x(d.ratingDate); })
                   .y(function(d) { return y(d.newRating); })


      var svg = d3.select('.history-graph').append('svg')
          .attr('width', w + padding.left + padding.right)
          .attr('height', h + padding.top + padding.bottom)


      svg.append('rect')
         .attr('x', padding.left)
         .attr('y', padding.top)
         .attr('width', w)
         .attr('height', h)



      svg.append('g')
         .attr('class', 'x axis')
         .attr('transform', 'translate(0,' + (h + padding.top) +')')
         .call(xAxis());

      svg.selectAll('g.x.axis .tick text')
         .attr('font-size', function(d) {
           return moment(d).format('MM') == '01' ? 12 : 10;
         });


      svg.append('g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(' + padding.left + ')')
          .call(yAxis().tickFormat(function(d) { return parseInt(d) })
           )

      svg.append('g')
         .attr('class', 'grid')
         .attr('transform', 'translate(0, ' + (h + padding.top) + ')')
         .call(
           xAxis(Math.round(w / 35)).tickSize(-h, 0, 0)
                   .tickFormat('')
         )

      svg.append('g')
         .attr('class', 'grid')
         .attr('transform', 'translate(' + padding.left + ',0)')
         .call(
           yAxis(Math.round(h / 30)).tickSize(-w, 0, 0)
                  .tickFormat('')
         )


      svg.append('path')
         .datum(history)
         .attr('class', 'line')
         .attr('d', line)


         // FIXME !!!
//        svg.append('g')
//           .selectAll('line')
//           .data($scope.colors)
//           .enter()
//           .append('line')
//           .attr('x1', totalW - 3)
//           .attr('x2', totalW - 3)
//           .attr('y1', function(d) {
//             return processRatingStripePoint(y(d.start));
//           })
//           .attr('y2', function(d) {
//             return processRatingStripePoint(y(d.end));
//           })
//           .attr('stroke', function(d) {
//             return d.color;
//           })
//           .attr('stroke-width', 3)

      function processRatingStripePoint(y) {
        console.log('y:' + y)
        if (y < padding.top) {
          return padding.top;
        } else if (y > totalH - padding.bottom) {
          return padding.bottom;
        } else {
          return y;
        }
      }

      svg.selectAll('circle')
         .data(history)
         .enter()
         .append('circle')
         .attr('cx', function(d) {
           return x(d.ratingDate);
         })
         .attr('cy', function(d) {
           return y(d.newRating);
         })
         .attr('fill', function(d) {
           return ratingToColor($scope.colors, d.newRating);
         })
         .on('mouseover', function(d) {
           $scope.historyRating = d.newRating;
           $scope.historyDate = moment(d.ratingDate).format('YYYY-MM-DD');
           $scope.historyChallenge = d.challengeName;
           $scope.$digest();
           d3.select(this)
             .attr('r', 4.0)
             .attr('stroke', 'black')
             .attr('stroke-width', '.5px');
         })
         .on('mouseout', function(d) {
           $scope.historyRating = undefined;
           $scope.$digest();
           d3.select(this)
             .attr('r', 3.0)
             .attr('stroke', 'none')
             .attr('stroke-width', '0px');
         })
         .attr('r', 3.0)


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
    
  }

})();
