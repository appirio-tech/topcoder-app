import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('onoffSwitch', onoffSwitch)

  function onoffSwitch() {
    return {
      restrict: 'E',
      template: require('./onoffswitch')(),
      scope: {
        model: '=',
        uniqueId: '='
      }
    }
  }
})()
