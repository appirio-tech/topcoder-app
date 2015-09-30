(function() {
  'use strict';

  angular.module('tc.mySRMs').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$locationProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    var states = {
      'my-srms': {
        url: '/my-srms/',
        parent: 'root',
        templateUrl: 'my-srms/my-srms.html',
        controller: 'MySRMsController',
        controllerAs: 'vm',
        data: {
          authRequired: true,
          title: 'My SRMs'
        }
      }
    };
    for (var name in states) {
      var state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
