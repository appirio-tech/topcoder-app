import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.account').config(routes)

  routes.$inject = ['$stateProvider']

  function routes($stateProvider) {
    var states = {
      'auth': {
        parent: 'root',
        abstract: true,
        data: {
          authRequired: false
        },
        onEnter: ['$state', '$location', '$stateParams', 'TcAuthService', 'logger',
          function($state, $location,  $stateParams, TcAuthService, logger) {
            logger.debug('Checking for authentication...')
            if (TcAuthService.isAuthenticated()) {
              // redirect to next if exists else dashboard
              if ($stateParams.next) {
                logger.debug('Redirecting: ' + $stateParams.next)
                window.location.href = decodeURIComponent($stateParams.next)
              } else {
                $state.go('dashboard')
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
            template: require('../layout/header/account-header')()
          },
          'container@': {
            template: require('./login/login')(),
            controller: 'LoginController',
            controllerAs: 'vm'
          },
          'footer@': {
            controller: 'FooterController as vm',
            template: require('../layout/footer/account-footer')()
          }
        }
      },
      'register': {
        parent: 'auth',
        url: '/register/?next&utm_source&utm_medium&utm_campaign',
        data: {
          title: 'Join'
        },
        views: {
          'header@': {
            template: require('../layout/header/account-header')()
          },
          'container@': {
            template: require('./register/register')(),
            controller: 'RegisterController',
            controllerAs: 'vm'
          },
          'footer@': {
            controller: 'FooterController as vm',
            template: require('../layout/footer/account-footer')()
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
            template: require('../layout/header/account-header')()
          },
          'container@': {
            template: require('./register/registered-successfully')()
          },
          'footer@': {
            controller: 'FooterController as vm',
            template: require('../layout/footer/account-footer')()
          }
        }
      },
      'resetPassword': {
        parent: 'auth',
        url: '/reset-password/?token&handle',
        data: {
          title: 'Reset Password'
        },
        views: {
          'header@': {
            template: require('../layout/header/account-header')()
          },
          'container@': {
            template: require('./reset-password/reset-password')(),
            controller: 'ResetPasswordController',
            controllerAs: 'vm'
          },
          'footer@': {
            controller: 'FooterController as vm',
            template: require('../layout/footer/account-footer')()
          }
        }
      },
      logout: {
        url: '/logout/',
        views: {
          'header@': {},
          'container@': {
            controller: 'LogoutController'
          },
          'footer@': {}
        },
        data: {
          authRequired: false
        }
      }
    }

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state)
    })
  }
})()
