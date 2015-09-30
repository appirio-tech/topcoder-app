(function() {
  'use strict';

  angular.module('tc.account').config(routes);

  routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    var states = {
      'auth': {
        parent: 'root',
        abstract: true,
        data: {
          authRequired: false
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
        url: '/login/?next&code&state&status&userJWTToken&utm_source&utm_medium&utm_campaign',
        params: { 'notifyReset': false },
        data: {
          title: 'Login'
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
            templateUrl: 'layout/footer/account-footer.html'
          }
        }
      },
      'register': {
        parent: 'auth',
        url: '/register/?next&utm_source&utm_medium&utm_campaign',
        data: {
          title: "Join"
        },
        views: {
          'header@': {
            templateUrl: 'layout/header/account-header.html'
          },
          'container@': {
            templateUrl: 'account/register/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
          },
          'footer@': {
            templateUrl: 'layout/footer/account-footer.html'
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
          },
          'footer@': {
            templateUrl: 'layout/footer/account-footer.html'
          }
        }
      },
      'resetPassword': {
        parent: 'auth',
        url: '/reset-password/?token&handle',
        data: {
          title: "Reset Password"
        },
        views: {
          'header@': {
            templateUrl: 'layout/header/account-header.html'
          },
          'container@': {
            templateUrl: 'account/reset-password/reset-password.html',
            controller: 'ResetPasswordController',
            controllerAs: 'vm'
          },
          'footer@': {
            templateUrl: 'layout/footer/account-footer.html'
          }
        }
      },
      logout: {
        url: '/logout/',
        controller: ['TcAuthService', function(TcAuthService) {
          TcAuthService.logout();
        }],
        data: {
          authRequired: false
        }
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  }
})();
