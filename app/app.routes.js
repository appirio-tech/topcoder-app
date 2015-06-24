(function() {
  'use strict';

  angular.module('topcoder-account').config(routes);

  routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'register/register.html'
      });

    $urlRouterProvider.otherwise('/login');
  }
})();
