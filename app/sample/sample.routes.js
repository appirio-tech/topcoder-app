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
        abstract: true,
        url: '/sample',
        template: '<div ui-view>Sample test code</div>',
        data: {
          authRequired: true,
          title: 'Sample page'
        }
      },
      'sample.child1': {
        url: '/child1',
        template: '<div>Sample child1</div>',
        data: {
          title: 'Child1'
        }
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  };
})();
