(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('HeaderDashboardController', HeaderDashboardController);

  HeaderDashboardController.$inject = [
    '$stateParams',
    'NotificationService',
    'profile',
    '$log'
  ];

  function HeaderDashboardController($stateParams, NotificationService, profile, $log) {
    var vm = this;
    vm.profile = profile;

    activate();

    function activate() {
      if ($stateParams.notifyReset) {
        NotificationService.inform('Thanks. Your new password has been set.');
      }
    }
  }
})();
