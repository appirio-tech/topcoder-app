import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.listings').config([
    '$stateProvider',
    routes
  ]).run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
//      if (toState.name.indexOf('sloog') > -1 && 400 <= error.status <= 500 ) {
//
//        // unable to find a member with that username
//        $state.go('404')
//      }
    })
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, error) {
      if (toState.name !== 'listings') {
        // remove usersnap widget if not in listings page
        var usersnapWidget = document.querySelectorAll('div[id*="_report_button"]')
        if (usersnapWidget && usersnapWidget[0]) usersnapWidget[0].remove()
      }
    })
    $rootScope.$on('$locationChangeSuccess', function(event, toState, fromState) {
      $rootScope.challengeFilter.forceUpdate()
    })
  }])

  function routes($stateProvider) {
    var states = {
      'listings': {
        parent: 'root',
        url: '/challenges/',
        resolve: {
          userHandle: ['$stateParams', function($stateParams) {
            return $stateParams.userHandle
          }]
        },
        data: {
          authRequired: false,
          title: 'Listings'
        },
        views: {
          'container@': {
            controller: 'ListingsCtrl as vm',
            template: require('./listings')()
          }
        }
      }
    }

    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
