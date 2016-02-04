import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.account').controller('LogoutController', LogoutController)

  LogoutController.$inject = ['$log', 'TcAuthService', '$window', 'CONSTANTS']

  function LogoutController($log, TcAuthService, $window, CONSTANTS) {
    $log = $log.getInstance('LogoutController')

    TcAuthService.logout()
    .then(function() {
      $log.debug('successfully logged out.')
      // redirect to home
      $window.location.href = CONSTANTS.MAIN_URL
    })

  }
})()
