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
      'profile': {
        parent: 'root',
        abstract: true,
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl as vm',
        resolve: {
          userHandle: ['$stateParams', function($stateParams) {
            return $stateParams.userHandle;
          }],
          userId: ['$stateParams', function($stateParams) {
            return $stateParams.userId;
          }]
        },
        data: {
          authRequired: false,
          title: "{{userHandle}} Profile"
        }
      },
      'profile.about': {
        url: '/members/:userHandle/:userId/',
        templateUrl: 'profile/about/about.html',
        controller: 'ProfileAboutController',
        controllerAs: 'vm'
      },
      'profile.develop': {
        url: '/members/:userHandle/:userId/develop/:type/',
        templateUrl: 'profile/develop/develop.html',
        controller: 'ProfileDevelopController',
        resolve: {
          type: ['$stateParams', function($stateParams) {
            return $stateParams.type;
          }]
        },
        controllerAs: 'vm'
      }
    };
    for (name in states) {
      state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
