import angular from 'angular'
import Auth0 from 'auth0-js'

(function() {
  'use strict'

  var dependencies = [
    'CONSTANTS',
    'ngCookies',
    'angular-storage',
    'angular-jwt',
    'auth0',
    'restangular',
    'ngIsoConstants.services',
    'blocks.logger'
  ]

  angular.module('tc.services', dependencies)
    .config(['$provide', 'authProvider', 'CONSTANTS', function($provide, authProvider, CONSTANTS) {
      $provide.decorator('$log', ['$delegate', 'LogEnhancer', function($delegate, LogEnhancer) {
        LogEnhancer.enhance$log($delegate)
        return $delegate
      }])

      authProvider.init({
        domain: CONSTANTS.auth0Domain,
        clientID: CONSTANTS.clientId,
        sso: false
      }, Auth0)

    }])
    .factory('UserPrefStore', ['store', function(store) {
      return store.getNamespacedStore('userSettings')
    }])

})()
