(function() {
  'use strict';

  angular.module('tc.account').config(routes);

  routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    var states = {
      'auth': {
        parent: 'root',
        onEnter: ['$state', '$stateParams', 'tcAuth', function($state, $stateParams, tcAuth) {
          if (tcAuth.isAuthenticated()) {
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
        url: '/login?next&code&state&status&userJWTToken',
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
      'registeredSuccessfully': {
        url: '/registeredsuccessfully',
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
      },
      logout: {
        url: '/logout',
        controller: ['tcAuth', function(tcAuth) {
          tcAuth.logout();
        }]
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  }
})();
