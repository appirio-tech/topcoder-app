(function() {
  'use strict';

  angular.module('topcoder').factory('NotificationService', NotificationService);

  NotificationService.$inject = ['notifications', 'ApiService', 'TcAuthService', '$rootScope'];

  function NotificationService(notifier, ApiService, TcAuthService, $rootScope) {
  	var service = {
      getNotifications: getNotifications
    };
    return service;

    var showing = false;

    $rootScope.$on(CONSTANTS.EVENT_USER_LOGGED_OUT, function() {
      showing = false;
      getNotifications();
    });

    function getNotifications() {
      if (TcAuthService.isAuthenticated() === true && !showing) {
        ApiService.restangularV3.one('notifications').get().then(function(notifications) {
          showing = true;
          angular.forEach(notifications, function(notification) {

            var opts = {
              message: notification.notificationTypeId === 1 ?
                'Your checkpoint submission for Styx iOS... is due in 3 days' :
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
    }
  }
})();
