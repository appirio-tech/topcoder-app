(function() {
  'use strict';

  angular.module('tc.account').config(routes);

  routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        parent: 'root',
        url: '/login?next',
        data: {
          title: 'Login',
          authRequired: false
        },
        views: {
          'container@': {
            templateUrl: 'account/login/login.html',
            controller: 'LoginController'
          },
          'footer@': {
            // no footer
            template: ''
          }
        }
      })
      .state('register', {
        url: '/register?next',
        data: {
          title: "Join",
          authRequired: false
        },
        views: {
          'container@': {
            templateUrl: 'account/register/register.html',
            controller: 'RegisterController'
          }
        }
      });

    $urlRouterProvider.otherwise('/login');
  }
})();
