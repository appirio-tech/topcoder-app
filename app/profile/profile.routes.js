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
        url: '/members/:userHandle/',
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl as vm',
        resolve: {
          userHandle: ['$stateParams', function($stateParams) {
            return $stateParams.userHandle;
          }]
        },
        data: {
          authRequired: false,
          title: "{{userHandle}} Profile"
        }
      },
      'profile.about': {
        url: '',
        templateUrl: 'profile/about/about.html',
        controller: 'ProfileAboutController',
        controllerAs: 'vm'
      },
      'profile.develop': {
        url: 'develop/?:subTrack',
        templateUrl: 'profile/develop/develop.html',
        controller: 'ProfileDevelopController',
        controllerAs: 'vm'
      }
    };
    for (name in states) {
      state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
