import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('tcTextarea', tcTextarea)

  function tcTextarea() {
    return {
      restrict: 'E',
      template: require('./tc-textarea')(),
      scope: {
        labelText: '@',
        placeholder: '@',
        characterCount: '=',
        characterCountMax: '@',
        value: '='
      }
    }
  }
})()
