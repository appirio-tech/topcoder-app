import angular from 'angular'
import moment from 'moment'
import d3 from 'd3'
import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import Tooltip from 'appirio-tech-react-components/components/Tooltip/Tooltip.jsx'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('historyGraph', historyGraph)

  function historyGraph() {
    return {
      restrict: 'E',
      template: require('./history-graph')(),
      scope: {
        promise: '=',
        rating: '=',
        graphState: '='
      },
      controller: ['$scope', '$state', 'CONSTANTS', HistoryGraphController]
    }
  }

  function HistoryGraphController($scope, $state, CONSTANTS) {
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
        right: 5,
        bottom: 100,
        left: 60
      }
    }

    var mobileMeasurements = {
      w: 300,
      h: 200,
      padding: {
        top: 10,
        right: 30,
        bottom: 50,
        left: 60
      }
    }

    var desktop = window.innerWidth >= 900 && true

    $scope.promise.then(function(history) {
      history.sort(function(left, right) {
        left = moment(left.ratingDate)
        right = moment(right.ratingDate)
        return left > right ? 1 : left < right ? -1 : 0
      })
      $scope.history = history

      var parseDate = d3.time.format.utc('%Y-%m-%dT%H:%M:%S.%LZ').parse

      history.forEach(function(d) {
        d.ratingDate = parseDate(d.ratingDate)
      })

      draw(desktop ? measurements : mobileMeasurements, history)
    })

    d3.select(window).on('resize.history', resize)

    function resize() {
      if (window.innerWidth < 900 && desktop) {
        d3.select('.history-graph svg').remove()
        draw(mobileMeasurements, $scope.history)
        desktop = false
      } else if (window.innerWidth >= 900 && !desktop) {
        d3.select('.history-graph svg').remove()
        draw(measurements, $scope.history)
        desktop = true
      }
    }

    function draw(measurements, history) {
      if (!history) return

      var w       = measurements.w
      var h       = measurements.h
      var padding = measurements.padding

      var totalH = h + padding.top + padding.bottom
      // var totalW = w + padding.left + padding.right

      var x = d3.time.scale()
                .range([padding.left + 5, w + padding.left - 5])
                .domain(d3.extent(history, function(d) { return d.ratingDate }))

      var y = d3.scale.linear()
                .range([h + padding.top - 5, padding.top + 5])
                .domain(d3.extent(history, function(d) { return d.newRating }))


      function yAxis(ticks) {
        return d3.svg.axis()
                 .scale(y)
                 .ticks(ticks || 10)
                 .orient('left')
      }

      function xAxis(ticks) {
        return d3.svg.axis()
                 .scale(x)
                 .ticks(ticks || 10)
                 .orient('bottom')
      }

      var line = d3.svg.line()
                   //.interpolate('cardinal')
                   .x(function(d) { return x(d.ratingDate) })
                   .y(function(d) { return y(d.newRating) })


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
         .call(xAxis().tickFormat(function(d) {
           var m = moment(d)
           if (m.format('MM') == '01') return m.format('YYYY')
           else return m.format('MMM').toUpperCase()
         }))

      svg.selectAll('g.x.axis .tick text')
         .attr('font-weight', function(d) {
           return moment(d).format('MM') == '01' ? 'bold' : 'normal'
         })
         .attr('fill', function(d) {
           return moment(d).format('MM') == '01' ? 'black' : '#a3a3ae'
         })
         .attr('font-size', function(d) {
           return 11
         })


      svg.append('g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(' + (padding.left - 25) + ')')
          .call(yAxis().tickFormat(function(d) { return parseInt(d) + '' })
           )

      svg.append('g')
         .attr('class', 'grid x')
         .attr('transform', 'translate(0, ' + (h + padding.top) + ')')
         .call(
           xAxis(/*Math.round(w / 35)*/).tickSize(-h, 0, 0)
                   .tickFormat('')
         )

      svg.append('g')
         .attr('class', 'grid y')
         .attr('transform', 'translate(' + padding.left + ',0)')
         .call(
           yAxis(/*Math.round(h / 30)*/).tickSize(-w, 0, 0)
                  .tickFormat('')
         )


      svg.append('path')
         .datum(history)
         .attr('class', 'line')
         .attr('d', line)


      // FIXME !!!
      svg.append('g')
         .selectAll('line')
         .data($scope.colors)
         .enter()
         .append('line')
         .attr('x1', padding.left - 18)
         .attr('x2', padding.left - 18)
         .attr('y1', function(d) {
           return processRatingStripePoint(y(d.start))
         })
         .attr('y2', function(d) {
           return processRatingStripePoint(y(d.end))
         })
         .attr('stroke', function(d) {
           return d.color
         })
         .attr('stroke-width', 3)

      function processRatingStripePoint(y) {
        if (y < padding.top || isNaN(y)) {
          return padding.top
        } else if (y > totalH - padding.bottom) {
          return totalH - padding.bottom
        } else {
          return y
        }
      }
      ReactDOM.unmountComponentAtNode(document.getElementById('chart-tooltip'))
      ReactDOM.render(<Tooltip popMethod='click'>
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
    
      svg.selectAll('circle')
         .data(history)
         .enter()
         .append('circle')
         .attr('cx', function(d) {
           return x(d.ratingDate)
         })
         .attr('cy', function(d) {
           return y(d.newRating)
         })
         .attr('fill', function(d) {
           return ratingToColor($scope.colors, d.newRating)
         })
         .on('mouseover', function(d) {
           $scope.historyRating = d.newRating
           $scope.historyDate = moment(d.ratingDate).format('YYYY-MM-DD')
           $scope.historyChallenge = d.challengeName
           $('#chart-tooltip .tooltip-container').on('click', function(){
             if($state.params && $state.params.track === 'DEVELOP')
               location.href = (CONSTANTS.CHALLENGE_DETAIL_URL + d.challengeId + '/?type=develop')
             else if($state.params && $state.params.subTrack === 'SRM')
               location.href = (CONSTANTS.SRM_DETAIL_URL + d.challengeId)
             else if($state.params && $state.params.subTrack === 'MARATHON_MATCH')
               location.href = (CONSTANTS.MARATHON_DETAIL_URL + d.challengeId)
           })           
           d3.select('#chart-tooltip')
              .style('left', (d3.event.pageX-5) + 'px')    
              .style('top', (d3.event.pageY-5) + 'px')
           d3.select('#chart-tooltip .tooltip-container')
              .style('left', '20px !important')    
              .style('top', '-20px !important')
           d3.select('#chart-tooltip .tooltip-container .tooltip-pointer')
              .style('left', '-5.5px !important')    
              .style('bottom', '25px !important')
          
           d3.select('#chart-tooltip .challenge-name').text($scope.historyChallenge)
           d3.select('#chart-tooltip .challenge-date').text(moment(d.ratingDate).format('MMM DD, YYYY'))
           d3.select('#chart-tooltip .tooltip-rating').text($scope.historyRating)
           d3.select('#chart-tooltip .tooltip-rating').style('background', ratingToColor($scope.colors, $scope.historyRating))
           $scope.$digest()
         })
         .on('mouseout', function(d) {
           $scope.historyRating = undefined
           $('#chart-tooltip').off('click')
           $scope.$digest()
         })
         
      d3.select('body').on('click', function(){
        if((d3.event.target.classList[0] != 'tooltip-target') && !$('#chart-tooltip .tooltip-container').hasClass('tooltip-hide') &&
          (d3.event.target.classList[0] != 'tooltip-content-container') && (d3.event.target.classList[0] != 'tooltip-container') &&
          (d3.event.target.classList[0] != 'tooltip-body') && (d3.event.target.classList[0] != 'Tooltip') &&
          (d3.event.target.tagName.toLowerCase()!='circle') && !(d3.event.target.tagName.toLowerCase()=='rect' && d3.event.target.classList[0] == 'hover')) {
          $('#chart-tooltip .tooltip-target').trigger('click')
        }
      })

    }

    function ratingToColor(colors, rating) {
      colors = colors.filter(function(color) {
        return rating >= color.start && rating <= color.end
      })
      return colors[0] && colors[0].color || 'black'
    }
  }
})()
