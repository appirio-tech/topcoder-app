import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.account').controller('LogoutController', LogoutController)

  LogoutController.$inject = ['logger', 'TcAuthService', '$window', 'CONSTANTS']

  function LogoutController(logger, TcAuthService, $window, CONSTANTS) {

    TcAuthService.logout()
    .then(function() {
      logger.debug('successfully logged out.')
      var accountsUrl = CONSTANTS.ACCOUNTS_APP_LOGOUT_URL + '?retUrl=' + encodeURIComponent(CONSTANTS.MAIN_URL)
      logger.info('redirect to '　+ accountsUrl)
      $window.location = accountsUrl
    })
  }
})()
