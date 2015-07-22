(function() {
  'use strict';

  angular.module('topcoder').controller('TopcoderController', TopcoderController);

  TopcoderController.$inject = ['notifications', 'NotificationService'];

  function TopcoderController(notifications, NotificationService) {
    var vm = this;
		NotificationService.getNotifications().then(function(data) {
      vm.notifications = data.result.content;
      
      angular.forEach(vm.notifications, function(notification) {
        if (notification.severity === "HIGH") {
          notifications.showError({message: 'You received a notification of type: ' + notification.notificationTypeId });
        } else {
          notifications.showWarning({message: 'You received a notification of type: ' + notification.notificationTypeId });
        }
      })
    });
  };
})();
