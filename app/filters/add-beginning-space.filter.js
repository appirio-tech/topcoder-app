import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder').filter('addBeginningSpace', addBeginningSpace)

  function addBeginningSpace() {
    return function(input) {
      return ' ' + input
    }
  }
})()
