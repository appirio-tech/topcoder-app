(function() {
  'use strict';

  angular.module('topcoder').controller('TopcoderController', TopcoderController);

  TopcoderController.$inject = ['notifications', 'NotificationService', 'TcAuthService', '$rootScope', 'CONSTANTS'];

  function TopcoderController(notifier, NotificationService, TcAuthService, $rootScope, CONSTANTS) {
    var vm = this;
    // set some $rootScope constants here
    $rootScope.DOMAIN = CONSTANTS.domain;
    console.log("rootscope", $rootScope)
    if (TcAuthService.isAuthenticated() === true) {
  		NotificationService.getNotifications().then(function(notifications) {
        angular.forEach(notifications, function(notification) {
          if (notification.severity === "HIGH") {
            notifier.showError({message: 'You received a notification of type: ' + notification.notificationTypeId });
          } else {
            notifier.showWarning({message: 'You received a notification of type: ' + notification.notificationTypeId });
          }
        })
      });
    }
  };
})();
