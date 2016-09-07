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
        view: '='
      }
    }
  })
})()
