import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.account').controller('LogoutController', LogoutController)

  LogoutController.$inject = ['logger', 'TcAuthService', '$window', 'CONSTANTS']

  function LogoutController(logger, TcAuthService, $window, CONSTANTS) {
    TcAuthService.logout().then(() => {
      logger.debug("MAIN_URL=> " + CONSTANTS.MAIN_URL)
      $window.location.href = CONSTANTS.MAIN_URL
    })
  }
})()
