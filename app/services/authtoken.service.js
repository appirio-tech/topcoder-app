import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('AuthTokenService', AuthTokenService)

  AuthTokenService.$inject = ['CONSTANTS', '$cookies', '$location', 'store', '$http', 'logger', 'jwtHelper', '$q']

  function AuthTokenService(CONSTANTS, $cookies, $location,  store, $http, logger, jwtHelper, $q) {
    var v2TokenKey = 'tcjwt'
    var v2TCSSOTokenKey = 'tcsso'
    var v3TokenKey = 'appiriojwt'
    // use this api url over CONSTANTS
    // var apiUrl = CONSTANTS.AUTH_API_URL || CONSTANTS.API_URL

    var service = {
      getV2Token: getV2Token,
      getTCSSOToken: getTCSSOToken,
      removeTokens: removeTokens
    }
    return service

    function getV2Token() {
      return $cookies.get(v2TokenKey)
    }

    function getTCSSOToken() {
      return $cookies.get(v2TCSSOTokenKey)
    }

    function removeTokens() {
      // remove tokens
      // need to provide domain when removing cookie
      var domain = $location.host().substring($location.host().indexOf('.'))
      $cookies.remove(v2TokenKey, {domain: domain})
      $cookies.remove('tcsso', {domain: domain})
      store.remove(v3TokenKey)
    }
  }

})()
