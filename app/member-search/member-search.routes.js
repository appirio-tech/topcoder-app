import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.search').config([
    '$stateProvider',
    routes
  ])

  function routes($stateProvider) {
    var states = {
      'memberSearch': {
        url: '/search/members/',
        parent: 'root',
        data: {
          title: 'Member Search'
        },
        views: {
          'header@': {
            template: require('../layout/header/header')(),
            controller: 'HeaderController',
            controllerAs: 'vm'
          },
          'container@': {
            template: require('./member-search')()
          },
          'footer@': {}
        }
      }
    }
    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
