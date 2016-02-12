import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder').filter('percentage', percentage)

  function percentage() {
    return function(x) {
      return Math.round(x * 100) + '%'
    }
  }

})()
