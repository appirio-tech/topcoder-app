import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.account').config(routes)

  routes.$inject = ['$stateProvider', 'CONSTANTS']

  function routes($stateProvider, CONSTANTS) {
    var states = {
      'auth': {
        parent: 'root',
        abstract: true,
        data: {
          authRequired: false
        }
      },
      'login': {
        url: '/login/?next&code&state&status&userJWTToken&utm_source&utm_medium&utm_campaign',
        views: {
          'header@': {},
          'container@': {},
          'footer@': {}
        },
        data: {
          authRequired: false
        },
        onEnter: ['$state', '$window', '$stateParams', 'logger',
          function($state, $window,  $stateParams, logger) {
            var next = $state.href('dashboard', {}, {absolute: true})
            if ($stateParams.next) {
              next = decodeURIComponent($stateParams.next)
            }
            $window.location = CONSTANTS.ACCOUNTS_APP_URL + '?retUrl=' + encodeURIComponent(next)
          }
        ]

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
