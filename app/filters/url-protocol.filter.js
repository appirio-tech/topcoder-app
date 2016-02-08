import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder').filter('urlProtocol', urlProtocol)

  function urlProtocol() {
    return function(link) {
      if (!link) {
        return link
      }
      var result
      var startingUrl = 'http://'
      var httpsStartingUrl = 'https://'
      if(link.indexOf(startingUrl) === 0||link.indexOf(httpsStartingUrl) === 0) {
        result = link
      } else {
        result = startingUrl + link
      }
      return result
    }
  }

})()
