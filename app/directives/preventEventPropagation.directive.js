import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('preventEventPropagation', preventEventPropagation)

  preventEventPropagation.$inject = ['$timeout', '$parse']

  function preventEventPropagation($timeout, $parse) {
    return function(scope, element, attr) {
      element.bind('click', function(evt) {
        evt.stopPropagation()
      })
    }
  }
})()
