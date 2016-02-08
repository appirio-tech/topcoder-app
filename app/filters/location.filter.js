import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder').filter('displayLocation', DisplayLocation)

  function DisplayLocation() {
    return function(components) {
      return components.filter(function(x) {
        return x
      }).join(', ')
    }
  }

})()
