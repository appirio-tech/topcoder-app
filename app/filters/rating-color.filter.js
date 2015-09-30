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
        // level 0 grey
        {
          'color': '#F0F0F0',
          'darkerColor': '#F0F0F0',
          'start': 0,
          'end': 0
        },
        // grey
        {
          'color': '#9D9FA0',
          'darkerColor': '#656565',
          'start': 1,
          'end': 899
        },
        // green
        {
          'color': '#69C329',
          'darkerColor': '#7aa307',
          'start': 900,
          'end': 1199
        },
        // blue
        {
          'color': '#616BD5',
          'darkerColor': '#078ccb',
          'start': 1200,
          'end': 1499
        },
        // yellow
        {
          'color': '#FCB816',
          'darkerColor': '#c2761e',
          'start': 1500,
          'end': 2199
        },
        // red
        {
          'color': '#EF3A3A',
          'darkerColor': '#cb0651',
          'start': 2200,
          'end': Infinity
        }
      ];

      return ratingToColor(colors, rating);

    };
  }

})();
