(function() {
  'use strict';

  angular.module('topcoder').factory('NotificationService', NotificationService);

  NotificationService.$inject = ['ApiService', 'TcAuthService'];

  function NotificationService(ApiService, TcAuthService) {
  	var service = {
      getNotifications: getNotifications
    };
    return service;

    function getNotifications() {
      if (TcAuthService.isAuthenticated() === true) {
        return ApiService.restangularV3.one('notifications').get();
      }
    }
  }
})();