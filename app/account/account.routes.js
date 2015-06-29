(function() {
  'use strict';

  angular.module('tc.account').config(routes);

  routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'account/login/login.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'account/register/register.html'
      });

    $urlRouterProvider.otherwise('/login');
  }
})();
