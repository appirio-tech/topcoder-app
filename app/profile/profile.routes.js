(function() {
  'use strict';

  angular.module('tc.profile').config([
    '$stateProvider',
    '$urlRouterProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider) {
    var name, state, states;
    states = {
      'baseProfile': {
        parent: 'root',
        abstract: true,
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl as vm'
      },
      'profile': {
        url: '/profile',
        parent: 'baseProfile',
        //controller: 'dashboard as db',
        data: {
        },
        views: {
        }
      }
    };
    for (name in states) {
      state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
