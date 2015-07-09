(function() {
  'use strict';

  angular.module('tc.myDashboard').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider, $httpProvider) {
    var name, state, states;
    states = {
      dashboard: {
        abstract: true,
        parent: 'root',
        template: '<div ui-view></div>',
        data: {
          authRequired: true,
        }
      },
      landing: {
        url: '/my-dashboard',
        templateUrl: 'member-dashboard/member-dashboard.html',
        controller: 'dashboard as db',
        authenticate: true,
        parent: 'dashboard',
        data: {
          authRequired: true,
          title: 'Dashboard'
        }
      }
    };
    for (name in states) {
      state = states[name];
      $stateProvider.state(name, state);
    }
    $urlRouterProvider.otherwise('/');
    return $httpProvider.interceptors.push('HeaderInterceptor');
  }
})();