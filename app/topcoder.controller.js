(function() {
  'use strict';

  angular.module('topcoder').controller('TopcoderController', TopcoderController);

  TopcoderController.$inject = ['NotificationService', '$rootScope', 'CONSTANTS'];

  function TopcoderController(NotificationService, $rootScope, CONSTANTS) {
    var vm = this;
    vm.menuVisible = false;
    // set some $rootScope constants here
    $rootScope.DOMAIN = CONSTANTS.domain;

    $rootScope.$on(CONSTANTS.EVENT_USER_LOGGED_IN, function() {
      NotificationService.getNotifications();
    });

    vm.globalToasterConfig = {
      'close-button': {
        'toast-warning': true,
        'toast-error': true,
        'toast-success': false
      },
      'body-output-type': 'trustedHtml',
      'position-class': 'toast-top-center'
    };
  }
})();
