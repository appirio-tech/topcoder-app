import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('challengeLinks', function() {
    return {
      restrict: 'E',
      transclude: false,
      replace: true,
      template: require('./challenge-links')(),
      scope: {
        challenge: '=',
        view: '=',
      },
      link: function(scope, element, attrs) {
        element.on('click', function() {
          window.location.href = $(this).attr('href');
        });
      }
    }
  })
})()
