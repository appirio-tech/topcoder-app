(function() {
  'use strict';

  angular.module('topcoder-account').config(routes);

  routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routes($locationProvider, $urlRouterProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.html'
      });

    $urlRouterProvider.otherwise('/login');
  }
})();
