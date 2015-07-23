(function() {
  'use strict';

  angular.module('tc.sample').config([
    '$stateProvider',
    '$urlRouterProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider) {
    var states = {
      sample: {
        parent: 'root',
        url: '/sample/',
        templateUrl: 'sample/sample.home.html',
        controller: 'SampleController',
        controllerAs: 'vm',
        data: {
          authRequired: false,
          title: 'Temp Home'
        }
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  };
})();
