import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder').filter('empty', empty)

  function empty() {
    return function(str, defaultVal) {
      if (str === 0) {
        return str
      } else if (!str || (typeof str === 'number' && isNaN(str)) || (typeof str === 'string' && (str.length === 0 || str.indexOf('NaN') >= 0 || str === '%'))) {
        return defaultVal || '-'
      } else {
        return str
      }
    }
  }

})()
