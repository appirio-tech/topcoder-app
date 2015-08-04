(function() {
  'use strict';

  angular.module('topcoder').factory('NotificationService', NotificationService);

  NotificationService.$inject = ['notifications', 'ApiService', 'TcAuthService', '$rootScope'];

  function NotificationService(notifier, ApiService, TcAuthService, $rootScope) {
  	var service = {
      getNotifications: getNotifications
    };
    return service;

    $rootScope.$on('$stateChangeSuccess', function(){
      getNotifications();
    });

    var showing = false;

    function getNotifications() {
      if (TcAuthService.isAuthenticated() === true && !showing) {
        ApiService.restangularV3.one('notifications').get().then(function(notifications) {
          showing = true;
          angular.forEach(notifications, function(notification) {

            var opts = {
              message: notification.notificationTypeId === 1 ? 
                'Your checkpoint submission for challenge xyz is due in 3 days' :
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