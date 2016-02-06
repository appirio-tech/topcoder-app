import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder').filter('ratingColor', ratingColor)

  function ratingColor() {
    return function(rating) {
      function ratingToColor(colors, rating) {
        // in case rating is a number formatted string
        if (typeof rating === 'string')
          rating = parseInt(rating.replace(',', ''))
        colors = colors.filter(function(color) {
          return rating !== null && rating >= color.start && rating <= color.end
        })
        return colors[0] && colors[0].color || 'black'
      }
      var colors = [
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

      return ratingToColor(colors, rating)
    }
  }
})()
