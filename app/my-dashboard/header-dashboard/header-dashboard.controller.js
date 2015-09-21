(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('HeaderDashboardController', HeaderDashboardController);

  HeaderDashboardController.$inject = [
    '$stateParams',
    'NotificationService',
    'UserService',
    'ProfileService',
    'CONSTANTS',
    'userIdentity'
  ];

  function HeaderDashboardController($stateParams, NotificationService, UserService, ProfileService, CONSTANTS, userIdentity) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.defaultPhotoUrl = CONSTANTS.ASSET_PREFIX + "images/avatarPlaceholder.png";
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

      ProfileService.getUserProfile(handle)
      .then(function(profile) {
        vm.profile = profile;
      });

      ProfileService.getUserStats(handle)
      .then(function(stats) {
        if (stats.COPILOT != null) {
          vm.numCopilotActiveContests = stats.COPILOT.activeContests;
        } else {
          vm.numCopilotActiveContests = 0;
        }

        vm.rankStats = ProfileService.getRanks(stats);

        if (vm.rankStats.length === 0) {
          vm.hasRatings = false;
        }

        vm.loading = false;
      })
      .catch(function(err) {
        vm.hasRatings = false;
        vm.loading = false;
        // todo handle error
      })

      ProfileService.getUserFinancials(handle)
      .then(function(financials) {
        vm.moneyEarned = _.sum(_.pluck(financials, 'amount'));
      });
    }
  }
})();
