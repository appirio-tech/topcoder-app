(function() {
  'use strict';

  angular.module('tc.account').controller('LogoutController', LogoutController);

  LogoutController.$inject = ['$log', 'TcAuthService', '$location'];

  function LogoutController($log, TcAuthService, $location) {
    $log = $log.getInstance('LogoutController');

    TcAuthService.logout()
    .then(function() {
      $log.debug("successfully logged out.");
      // redirect to home
      $location.path("/");
    });

  }
})();
