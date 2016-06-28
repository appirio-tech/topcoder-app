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
        parent: 'auth',
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
      'register': {
        url: '/register/?next&utm_source&utm_medium&utm_campaign',
        parent: 'auth',
        views: {
          'header@': {},
          'container@': {},
          'footer@': {}
        },
        data: {
          title: 'Join',
          authRequired: false
        },
        onEnter: ['$state', '$window', '$stateParams', 'logger',
          function($state, $window,  $stateParams, logger) {
            var next = $state.href('dashboard', {}, {absolute: true})
            if ($stateParams.next) {
              next = decodeURIComponent($stateParams.next)
            }
            var queryStr = '?retUrl=' + encodeURIComponent(next)
            for(var param in $stateParams) {
              if ($stateParams[param]) {
                queryStr += ('&' + param + '=' + encodeURIComponent($stateParams[param]))
              }
            }
            $window.location = CONSTANTS.ACCOUNTS_APP_URL + '/registration' + queryStr
          }
        ]

      },
      logout: {
        parent: 'auth',
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
