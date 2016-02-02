import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.community').config([
    '$stateProvider',
    routes
  ])

  function routes($stateProvider) {
    var states = {
      'community': {
        parent: 'root',
        url: '/community/',
        abstract: true,
        data: {
          authRequired: false
        }
      },
      'community.members': {
        parent: 'root',
        url: '/community/members/',
        template: require('./members')(),
        controller: 'MembersController',
        controllerAs: 'ctrl',
        data: {
          authRequired: false,
          title: 'Community Members'
        }
      },

      'community.statistics': {
        parent: 'root',
        url: '/community/statistics/',
        template: require('./statistics')(),
        controller: 'StatisticsController',
        controllerAs: 'ctrl',
        data: {
          title: 'Community Statistics'
        }
      }
    }

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state)
    })
  }
})()
