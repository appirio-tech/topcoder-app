import angular from 'angular'

(function () {
  'use strict'

  angular.module('tcUIComponents').directive('trackToggle', trackToggle)

  function trackToggle() {
    return {
      restrict: 'E',
      template: require('./track-toggle')(),
      scope: {
        tracks: '=tracks'
      }
    }
  }
})()
