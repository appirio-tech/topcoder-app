import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.mySRMs').config([
    '$stateProvider',
    routes
  ])

  function routes($stateProvider) {
    var states = {
      'my-srms': {
        url: '/my-srms/',
        parent: 'root',
        template: require('./my-srms')(),
        controller: 'MySRMsController',
        controllerAs: 'vm',
        data: {
          authRequired: true,
          title: 'My SRMs'
        }
      }
    }

    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
