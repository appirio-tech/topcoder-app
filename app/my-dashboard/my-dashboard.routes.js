(function() {
  'use strict';

  angular.module('tc.myDashboard').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider, $httpProvider) {
    var states = {
      'baseDashboard': {
        parent: 'root',
        abstract: true,
        templateUrl: 'my-dashboard/my-dashboard.html',
        controller: 'MyDashboardController',
        controllerAs: 'dashboard',
        data: {
          authRequired: true,
          title: 'Dashboard'
        }
      },
      'dashboard': {
        url: '/my-dashboard/',
        params: { 'notifyReset': false },
        parent: 'baseDashboard',
        views: {
          'header-dashboard' : {
            templateUrl: 'my-dashboard/header-dashboard/header-dashboard.html',
            controller: 'HeaderDashboardController',
            controllerAs: 'vm'
          },
          'my-challenges': {
            templateUrl: "my-dashboard/my-challenges/my-challenges.html",
            controller: 'MyChallengesController',
            controllerAs: 'vm'
          },
          'srms' :{
            templateUrl: 'my-dashboard/srms/srms.html',
            controller: 'SRMWidgetController',
            controllerAs: 'vm'
          },
          'programs': {
            templateUrl: 'my-dashboard/programs/programs.html',
            controller: 'ProgramsController',
            controllerAs: 'vm'
          },
          'community-updates' : {
            templateUrl: 'my-dashboard/community-updates/community-updates.html',
            controller: 'CommunityUpdatesController',
            controllerAs: 'vm'
          }
        }
      }
    };
    for (var name in states) {
      var state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
