import angular from 'angular'
import d3 from 'd3'
import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import Tooltip from 'appirio-tech-react-components/components/Tooltip/Tooltip.jsx'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('distributionGraph', distributionGraph)

  function distributionGraph() {
    return {
      restrict: 'E',
      template: require('./distribution-graph')(),
      scope: {
        promise: '=',
        rating: '=',
        graphState: '='
      },
      controller: ['$scope', DistributionGraphController]
    }
  }

  function DistributionGraphController($scope) {
    $scope.colors = [
      // grey
      {
        'color': '#9D9FA0',
        'darkerColor': '#9D9FA0',
        'start': 0,
        'end': 899
      },
      // green
      {
        'color': '#69C329',
        'darkerColor': '#69C329',
        'start': 900,
        'end': 1199
      },
      // blue
      {
        'color': '#616BD5',
        'darkerColor': '#616BD5',
        'start': 1200,
        'end': 1499
      },
      // yellow
      {
        'color': '#FCD617',
        'darkerColor': '#FCD617',
        'start': 1500,
        'end': 2199
      },
      // red
      {
        'color': '#EF3A3A',
        'darkerColor': '#EF3A3A',
        'start': 2200,
        'end': Infinity
      }
    ]

    var measurements = {
      w: 900,
      h: 400,
      padding: {
        top: 20,
        left: 60,
        bottom: 100,
        right: 5
      }
    }

    var mobileMeasurements = {
      w: 350,
      h: 200,
      padding: {
        top: 50,
        left: 60,
        bottom: 80,
        right: 50
      }
    }

    var desktop = window.innerWidth >= 900 && true

    $scope.promise.then(function(data) {
      $scope.distribution = data.distribution
      draw(desktop ? measurements : mobileMeasurements, $scope.distribution)
    })

    d3.select(window).on('resize.distribution', resize)

    function resize() {
      if (window.innerWidth < 900 && desktop) {
        d3.select('.distribution-graph svg').remove()
        draw(mobileMeasurements, $scope.distribution)
        desktop = false
      } else if (window.innerWidth >= 900 && !desktop) {
        d3.select('.distribution-graph svg').remove()
        draw(measurements, $scope.distribution)
        desktop = true
      }
    }

    function draw(measurements, distribution) {

      var w       = measurements.w
      var h       = measurements.h
      var padding = measurements.padding
      var totalW = w + padding.left + padding.right
      var totalH = h + padding.top + padding.bottom

      $scope.displayCoders = false
      $scope.numCoders = 100
      var ranges = getRanges(distribution)
      removeLeadingZeroes(ranges)
      removeTrailingZeroes(ranges)
      var xScale = d3.scale.ordinal()
                     .domain(d3.range(ranges.length))
                     .rangeRoundBands([padding.left, padding.left + w], 0.05)
      var yScale = d3.scale.linear()
                     .domain([0, d3.max(ranges, function(range) { return range.number }) + 1])
                     .range([totalH - padding.bottom, padding.top])
      var xScale2 = d3.scale.linear()
                      .domain([ranges[0].start,
                              d3.max(ranges, function(range) { return range.end })])
                      .range([padding.left, totalW - padding.right])
      var svg = d3.select('div.distribution-graph')
                  .append('svg')
                  .attr('width', totalW)
                  .attr('height', totalH)

      svg.append('rect')
         .attr('x', padding.left)
         .attr('y', padding.top)
         .attr('width', w)
         .attr('height', h)
         .attr('fill', '#f6f6f6')

      svg.append('g')
         .attr('class', 'grid')
         .attr('transform', 'translate(' + padding.left + ',0)')
         .call(
           yAxis(5).tickSize(-totalW, 0, 0)
                  .tickFormat('')
         )

      svg.append('g')
         .attr('class', 'axis')
         .attr('transform', 'translate(' + padding.left + ', 0)')
         .call(yAxis(5))

      svg.append('line')
         .attr('x1', xScale2($scope.rating))
         .attr('y1', totalH - padding.bottom)
         .attr('x2', xScale2($scope.rating))
         .attr('y2', padding.top)
         .attr('class', 'my-rating')
         .attr('stroke-width', 2)
         .attr('stroke', ratingToColor($scope.colors, $scope.rating))

      svg.selectAll('rect.bar')
         .data(ranges)
         .enter()
         .append('rect')
         .attr('class', 'bar')
         .attr('x', function(d, i) {
           return xScale(i)
         })
         .attr('y', function(d) {
           return yScale(d.number)
         })
         .attr('width', xScale.rangeBand())
         .attr('height', function(d) {
           return totalH - padding.bottom - yScale(d.number)
         })
         .attr('fill', function(d) {
           return ratingToColor($scope.colors, d.start)
         })

      ReactDOM.unmountComponentAtNode(document.getElementById('chart-tooltip'))
      ReactDOM.render(<Tooltip>
          <div className='tooltip-target'></div>
          <div className='tooltip-body'>
          <div className='tooltip-rating'></div>
          <div className='tooltip-challenge'>
            <div className='challenge-name'></div>
            <div className='challenge-date'></div>
          </div>
          </div>
        </Tooltip>
        , document.getElementById('chart-tooltip'))   
       
      svg.selectAll('rect.hover')
         .data(ranges)
         .enter()
         .append('rect')
         .attr('class', 'hover')
         .attr('fill', 'transparent')
         .attr('x', function(d, i) {
           return xScale(i)
         })
         .attr('y', function(d) {
           return padding.top
         })
         .attr('width', xScale.rangeBand())
         .attr('height', function(d) {
           return totalH - padding.bottom - padding.top
         })
         .on('mouseover', function(d) {
           $scope.highlightedRating = d.start
           $scope.displayCoders = true
           $scope.numCoders = d.number
           $scope.$digest()
         
           d3.select('#chart-tooltip')
              .style('left', (d3.event.pageX-2) + 'px')    
                .style('top', (d3.event.pageY-2) + 'px')
          .style('display', 'block')
           $('#chart-tooltip').addClass('distribution')
           d3.select('#chart-tooltip .tooltip-container')
          .style('left', '20px !important')    
                .style('top', '-20px !important')
          .style('opacity', '1')
           d3.select('#chart-tooltip .tooltip-container .tooltip-pointer')
          .style('left', '-5.5px !important')    
                .style('bottom', '25px !important')
          
           d3.select('#chart-tooltip .challenge-name').text($scope.numCoders + ' Coders')
           d3.select('#chart-tooltip .challenge-date').text('Rating Range: '+ $scope.highlightedRating + '-'+($scope.highlightedRating+99))
           d3.select('#chart-tooltip .tooltip-rating').text($scope.numCoders)
           d3.select('#chart-tooltip .tooltip-rating').style('background', ratingToColor($scope.colors, $scope.highlightedRating))
           $('#chart-tooltip').show()
         
         })
         .on('mouseout', function(d) {
           $scope.displayCoders = false
           $scope.highlightedRating = false
           $('#chart-tooltip').removeClass('distribution')
           $('#chart-tooltip').hide()
           $scope.$digest()
         })

      svg.selectAll('line.xaxis')
         .data(ranges)
         .enter()
         .append('line')
         .attr('class', 'xaxis')
         .attr('x1', function(d, i) {
           if (i === 0) {
             return padding.left
           } else {
             return xScale(i) - .5
           }
         })
         .attr('x2', function(d, i) {
           if (i === ranges.length - 1) {
             return totalW - padding.right
           } else {
             return xScale(i) + xScale.rangeBand() + .5
           }
         })
         .attr('y1', h + padding.top + .5)
         .attr('y2', h + padding.top + .5)
         .attr('stroke', function(d) {
           return ratingToColor($scope.colors, d.start)
         })

      var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom')
                    .ticks(ranges.length)

      function yAxis(ticks) {
        return d3.svg.axis()
          .scale(yScale)
          .orient('left')
          .ticks(ticks)
      }

      svg.append('g')
         .attr('class', 'axis')
         .attr('transform', 'translate(0,' + (h + padding.top) + ')')
         .call(xAxis)
         .selectAll('text')
         .attr('x', 9)
         .attr('y', 0)
         .attr('dy', '.35em')
         .attr('transform', 'rotate(90)')
         .style('text-anchor', 'start')
         .text(function(d, i) {
           var range = ranges[i]
           return range.start + ' - ' + range.end
         })


    }

    function getRanges(distribution) {
      var ranges = []
      for (var range in distribution) {
        ranges.push({
          'name': range,
          'number': distribution[range],
          'start': getRangeStart(range),
          'end': getRangeEnd(range)
        })
      }
      ranges.sort(function(a, b) {
        return a.start - b.start
      })
      return ranges
    }

    function getRangeStart(range) {
      return parseInt(
        range.match(/\d+/)[0]
      )
    }

    function getRangeEnd(range) {
      return parseInt(
        range.match(/To(\d+)/)[1]
      )
    }

    function removeLeadingZeroes(ranges) {
      while(ranges[0].number == 0) {
        ranges.shift()
      }
    }

    function removeTrailingZeroes(ranges) {
      while (ranges[ranges.length - 1].number == 0) {
        ranges.pop()
      }
    }

    function ratingToColor(colors, rating) {
      colors = colors.filter(function(color) {
        return rating >= color.start && rating <= color.end
      })
      return colors[0] && colors[0].color || 'black'
    }

    // function ratingToDarkerColor(colors, rating) {
    //   colors = colors.filter(function(color) {
    //     return rating >= color.start && rating <= color.end
    //   })
    //   return colors[0] && colors[0].darkerColor || 'black'
    // }

    // // TODO: delete because this is probably unnecessary
    // function ratingToRange(ranges, rating) {
    //   var ans =  ranges.filter(function(range) {
    //     return rating >= range.start && rating <= range.end
    //   })
    //   if (ans.length == 1) return ans[0].name
    //   else return 'ratingRange0To099'
    // }
  }
})()
