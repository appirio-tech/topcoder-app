import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder').filter('npad', npad)

  function npad() {
    return function(input, n) {
      if(input === undefined) input = ''
      var inputStr = input
      if (typeof input !== 'string') {
        inputStr = input.toString()
      }
      if(inputStr.length >= n)
        return inputStr
      var zeros = new Array( n + 1 ).join('0')
      return (zeros + inputStr).slice(-1 * n)
    }
  }
})()
