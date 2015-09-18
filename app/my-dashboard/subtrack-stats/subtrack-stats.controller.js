(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('SubtrackStatsController', SubtrackStatsController);

  SubtrackStatsController.$inject = [
    'ProfileService',
    'userIdentity'
  ];

  function SubtrackStatsController(ProfileService, userIdentity) {
    var vm = this;
    vm.loading = true;
    vm.hasRatings = true;
    vm.rankStats = [];

    activate();

    function activate() {
      var handle = userIdentity.handle;

      ProfileService.getUserStats(handle)
      .then(function(stats) {
        if (!_.isUndefined(stats.COPILOT)) {
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
    }
  }
})();
