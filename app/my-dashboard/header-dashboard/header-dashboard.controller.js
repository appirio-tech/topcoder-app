(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('HeaderDashboardController', HeaderDashboardController);

  HeaderDashboardController.$inject = [
    '$stateParams',
    'NotificationService',
    'ProfileService',
    'CONSTANTS',
    'userIdentity',
    '$q'
  ];

  function HeaderDashboardController($stateParams, NotificationService, ProfileService, CONSTANTS, userIdentity, $q) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.isCopilot = false;
    vm.loading = true;
    vm.hasRatings = true;
    vm.rankStats = [];

    if ($stateParams.notifyReset) {
      NotificationService.inform('Thanks. Your new password has been set.');
    }

    activate();

    function activate() {
      var handle = userIdentity.handle;

      $q.all([
        ProfileService.getUserStats(handle),
        ProfileService.getUserFinancials(handle)
      ]).then(function(data) {
        var stats = data[0];
        var financials = data[1];

        vm.moneyEarned = _.sum(_.pluck(financials, 'amount'));

        if (stats.COPILOT != null) {
          vm.numCopilotActiveContests = stats.COPILOT.activeContests;
        } else {
          vm.numCopilotActiveContests = 0;
        }

        vm.loading = false;
      })
      .catch(function(err) {
        vm.hasRatings = false;
        vm.loading = false;
      });
    }
  }
})();
