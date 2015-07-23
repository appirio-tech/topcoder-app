(function() {
  'use strict';

  angular.module('tc.account').config(routes);

  routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    var states = {
      'auth': {
        parent: 'root',
        data: {
          onAccountPage: true
        },
        onEnter: ['$state', '$stateParams', 'TcAuthService', function($state, $stateParams, TcAuthService) {
          if (TcAuthService.isAuthenticated()) {
            // redirect to next if exists else dashboard
            if ($stateParams.next) {
              $log.debug('Redirecting: ' + $stateParams.next);
              window.location.href = decodeURIComponent($stateParams.next);
            } else {
              $state.go('dashboard');
            }
          }
        }]
      },
      'login': {
        parent: 'auth',
        url: '/login/?next&code&state&status&userJWTToken',
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
        parent: 'auth',
        url: '/register/?next',
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
      'registeredSuccessfully': {
        url: '/registered-successfully/',
        data: {
          title: 'Registered',
          authRequired: false
        },
        views: {
          'header@': {
            templateUrl: 'layout/header/account-header.html'
          },
          'container@': {
            templateUrl: 'account/register/registered-successfully.html'
          }
        }
      },
      'resetPasswordLink': {
        url: '/initiate-reset-password/',
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
        url: '/reset-password-sent/',
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
        url: '/reset-password/',
        data: {
          title: "Reset Password",
          onAccountPage: true,
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
      },
      logout: {
        url: '/logout/',
        controller: ['TcAuthService', function(TcAuthService) {
          TcAuthService.logout();
        }]
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  }
})();
