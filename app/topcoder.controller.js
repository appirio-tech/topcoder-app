(function() {
  'use strict';

  angular.module('topcoder').controller('TopcoderController', TopcoderController);

  TopcoderController.$inject = ['notifications', 'NotificationService', 'TcAuthService', '$rootScope', 'CONSTANTS'];

  function TopcoderController(notifier, NotificationService, TcAuthService, $rootScope, CONSTANTS) {
    var vm = this;
    // set some $rootScope constants here
    $rootScope.DOMAIN = CONSTANTS.domain;

    if (TcAuthService.isAuthenticated() === true) {
  		NotificationService.getNotifications().then(function(notifications) {
        angular.forEach(notifications, function(notification) {
          
          var opts = {
            message: notification.notificationTypeId === 1 ? 
              'Your checkpoint submission for challenge xyz is due in 2 days' :
              'You received a notification of type: ' + notification.notificationTypeId
          };
          
          switch(notification.severity) {
            case "HIGH": notifier.showError(opts); break;
            case "MEDIUM": notifier.showWarning(opts); break;
            default: notifier.showSuccess(opts);
          }

        })
      });
    }
  };
})();
