(function() {
  'use strict';

  angular.module('tc.account').config(routes);

  routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    var states = {
      'login': {
        parent: 'root',
        url: '/login?next',
        data: {
          title: 'Login',
          authRequired: false
        },
        views: {
          'header@': {
            templateUrl: 'layout/header/account-header.html'
          },
          'container@': {
            templateUrl: 'account/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          },
          'footer@': {
            // no footer
            template: ''
          }
        }
      },
      'register': {
        url: '/register?next',
        data: {
          title: "Join",
          authRequired: false
        },
        views: {
          'header@': {
            templateUrl: 'layout/header/account-header.html'
          },
          'container@': {
            templateUrl: 'account/register/register.html',
            controller: 'RegisterController'
          }
        }
      }
    };

    $urlRouterProvider.otherwise('/login');

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  }
})();
