(function() {
  'use strict';

  angular.module('tc.profile').config([
    '$stateProvider',
    '$urlRouterProvider',
    routes
  ]);

  function routes($stateProvider, $stateParams, $urlRouterProvider) {
    var name, state, states;
    states = {
      'baseProfile': {
        parent: 'root',
        abstract: true,
        templateUrl: 'profile/header/header.html',
        controller: 'ProfileCtrl as vm',
      },
      'profile': {
        url: '/profile/',
        parent: 'baseProfile',
        //controller: 'dashboard as db',
        data: {
        },
        views: {
          'about': {
            templateUrl: 'profile/about/about.html',
            controller: 'ProfileAboutController',
            controllerAs: 'vm',
          }
        }
      }
    };
    for (name in states) {
      state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
