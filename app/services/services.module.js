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
    .config(['authProvider', 'CONSTANTS', function(authProvider, CONSTANTS) {
      authProvider.init({
        domain: CONSTANTS.AUTH0_DOMAIN,
        clientID: CONSTANTS.AUTH0_CLIENT_ID,
        sso: false
      }, Auth0)

    }])
    .factory('UserPrefStore', ['store', function(store) {
      return store.getNamespacedStore('userSettings')
    }])
})()
