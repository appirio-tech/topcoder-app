(function() {
  'use strict';

  angular.module('topcoder').controller('TopcoderController', TopcoderController);

  TopcoderController.$inject = ['NotificationService', '$rootScope', 'CONSTANTS'];

  function TopcoderController(NotificationService, $rootScope, CONSTANTS) {
    var vm = this;
    vm.menuVisible = false;
    vm.loggedIn = false;
    // set some $rootScope constants here
    $rootScope.DOMAIN = CONSTANTS.domain;

    $rootScope.$on(CONSTANTS.EVENT_USER_LOGGED_IN, function() {
      NotificationService.getNotifications();
    });
  };
})();
