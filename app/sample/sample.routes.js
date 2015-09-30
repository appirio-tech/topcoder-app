(function() {
  'use strict';

  angular.module('tc.sample').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    var states = {
      sample: {
        parent: 'root',
        url: '/its-coming/',
        templateUrl: 'sample/sample.home.html',
        controller: 'SampleController',
        controllerAs: 'vm',
        data: {
          authRequired: false,
          title: 'It\'s Coming'
        }
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  };
})();
