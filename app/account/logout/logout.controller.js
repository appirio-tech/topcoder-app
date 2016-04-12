import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.account').controller('LogoutController', LogoutController)

  LogoutController.$inject = ['logger', 'TcAuthService', '$window', 'CONSTANTS']

  function LogoutController(logger, TcAuthService, $window, CONSTANTS) {

    TcAuthService.logout()
    .then(function() {
      logger.debug('Successfully logged out.')

      // Redirect to home
      $window.location.href = CONSTANTS.MAIN_URL
    })
  }
})()
