(function() {
  'use strict';

  angular.module('topcoder').filter('ratingColor', ratingColor);

  function ratingColor() {
    return function(rating) {
      function ratingToColor(colors, rating) {
        colors = colors.filter(function(color) {
          return rating >= color.start && rating <= color.end;
        });
        return colors[0] && colors[0].color || 'black';
      }
      var colors = [
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

      return ratingToColor(colors, rating);

    };
  }

})();
