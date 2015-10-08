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
        abstract: true,
        data: {
          authRequired: false,
        }
      },
      
      'community.members': {
        parent: 'root',
        url: '/community/members/',
        templateUrl: 'community/members.html'
      },
      
      'community.statistics': {
        parent: 'root',
        url: '/community/statistics/',
        templateUrl: 'community/statistics.html'
      },
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  };
})();
