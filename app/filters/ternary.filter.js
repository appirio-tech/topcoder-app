import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder').filter('ternary', ternary)

  /**
   * This filter enable conditional statment for angular expression.
   * usage: {{ expression | ternary : value1 : value2}}
   */
  function ternary() {
    return function (input, trueValue, falseValue) {
      return input ? trueValue : falseValue
    }
  }

})()
