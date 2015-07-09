(function() {
  'use strict';

  angular.module('tc.account').config(routes);

  routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    var states = {
      'login': {
        parent: 'root',
        url: '/login?next&code&state&status',
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
            controller: 'RegisterController',
            controllerAs: 'vm'
          }
        }
      },
      'resetPasswordLink': {
        url: '/initiate-reset-password',
        data: {
          title: "Reset Password",
          authRequired: false
        },
        views: {
          'header@': {
            templateUrl: 'layout/header/account-header.html'
          },
          'container@': {
            templateUrl: 'account/reset-password/reset-password-link.html',
            controller: 'ResetPasswordController',
            controllerAs: 'vm'
          }
        }
      },
      'resetPasswordLinkConfirmation': {
        url: '/reset-password-sent',
        data: {
          title: "Reset Password",
          authRequired: false
        },
        views: {
          'header@': {
            templateUrl: 'layout/header/account-header.html'
          },
          'container@': {
            templateUrl: 'account/reset-password/reset-password-link-sent.html',
          }
        }
      },
      'resetPassword': {
        url: '/reset-password',
        data: {
          title: "Reset Password",
          authRequired: false
        },
        views: {
          'header@': {
            templateUrl: 'layout/header/account-header.html'
          },
          'container@': {
            templateUrl: 'account/reset-password/reset-password.html',
          }
        }
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  }
})();
