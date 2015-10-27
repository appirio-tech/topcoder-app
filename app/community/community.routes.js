(function() {
  'use strict';

  angular.module('tc.community').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    var states = {
      'community': {
        parent: 'root',
        url: '/community/',
        data: {
          authRequired: false,
        },
        controller: 'BaseCommunityController'
      },
      'community.members': {
        parent: 'root',
        url: '/community/members/',
        templateUrl: 'community/members.html',
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
        templateUrl: 'community/statistics.html',
        controller: 'StatisticsController',
        controllerAs: 'ctrl',
        data: {
          title: 'Community Statistics'
        }
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  };
})();
