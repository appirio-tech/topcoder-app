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
  }])

  function routes($stateProvider) {
    var states = {
      'listings': {
        parent: 'root',
        url: '/listings/',
        template: require('./listings')(),
        controller: 'ListingsCtrl as vm'
      }
    }

    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
