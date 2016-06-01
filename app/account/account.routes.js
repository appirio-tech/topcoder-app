import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.account').config(routes)

  routes.$inject = ['$stateProvider']

  function routes($stateProvider) {
    var states = {
      'auth': {
        parent: 'root',
        abstract: true,
        data: {
          authRequired: false
        }
      },
      logout: {
        url: '/logout/',
        views: {
          'header@': {},
          'container@': {
            controller: 'LogoutController'
          },
          'footer@': {}
        },
        data: {
          authRequired: false
        }
      }
    }

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state)
    })
  }
})()
