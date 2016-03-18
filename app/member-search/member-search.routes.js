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
        template: require('./member-search')(),
        data: {
          title: 'Member Search'
        }
      }
    }
    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
