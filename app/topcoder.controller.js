(function() {
  'use strict';

  angular.module('topcoder').controller('TopcoderController', TopcoderController);

  TopcoderController.$inject = ['NotificationService', '$rootScope', 'CONSTANTS'];

  function TopcoderController(NotificationService, $rootScope, CONSTANTS) {
    var vm = this;
    // set some $rootScope constants here
    $rootScope.DOMAIN = CONSTANTS.domain;

    NotificationService.getNotifications();
  };
})();
