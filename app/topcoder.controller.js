(function() {
  'use strict';

  angular.module('topcoder').controller('TopcoderController', TopcoderController);

  TopcoderController.$inject = ['notifications', 'NotificationService', 'TcAuthService'];

  function TopcoderController(notifier, NotificationService, TcAuthService) {
    var vm = this;
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
