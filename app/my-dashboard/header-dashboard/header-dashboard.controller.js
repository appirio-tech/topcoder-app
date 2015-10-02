(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('HeaderDashboardController', HeaderDashboardController);

  HeaderDashboardController.$inject = [
    '$stateParams',
    'NotificationService',
    'ProfileService',
    'userIdentity'
  ];

  function HeaderDashboardController($stateParams, NotificationService, ProfileService, userIdentity) {
    var vm = this;
    vm.loading = true;

    if ($stateParams.notifyReset) {
      NotificationService.inform('Thanks. Your new password has been set.');
    }

    activate();

    function activate() {
      var handle = userIdentity.handle;

      ProfileService.getUserFinancials(handle)
      .then(function(financials) {
        vm.moneyEarned = _.sum(_.pluck(financials, 'amount'));
        vm.loading = false;

      })
      .catch(function(err) {
        vm.loading = false;
      });
    }
  }
})();
