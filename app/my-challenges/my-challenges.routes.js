import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.myChallenges').config([
    '$stateProvider',
    routes
  ])

  function routes($stateProvider) {
    var states = {
      'my-challenges': {
        url: '/my-challenges/?:status',
        parent: 'root',
        template: require('./my-challenges')(),
        controller: 'MyChallengesController',
        controllerAs: 'vm',
        data: {
          authRequired: true,
          title: 'My Challenges'
        },
        resolve: {
          userIdentity: ['UserService', function(UserService) {
            return UserService.getUserIdentity()
          }]
        }
      }
    }

    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
