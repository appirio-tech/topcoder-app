(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('SubtrackStatsController', SubtrackStatsController);

  SubtrackStatsController.$inject = ['$filter', 'ProfileService', 'UserStatsService', 'userIdentity'];

  function SubtrackStatsController($filter, ProfileService, UserStatsService, userIdentity) {
    var vm = this;
    vm.loading = true;

    activate();

    function activate() {
      vm.handle = userIdentity.handle;

      ProfileService.getUserStats(vm.handle)
      .then(function(stats) {
        var trackRanks = ProfileService.getRanks(stats);
        var subtrackRanks = UserStatsService.compileSubtracks(trackRanks);

        UserStatsService.processStats(subtrackRanks);
        // sort subtrack ranks
        subtrackRanks = $filter('orderBy')(subtrackRanks, 'mostRecentEventDate', true);

        vm.subtrackRanks = subtrackRanks;
        vm.hasRanks = !!vm.subtrackRanks.length;

        vm.loading = false;
      })
      .catch(function(err) {
        vm.hasRanks = false;
        vm.loading = false;
      });
    }
  }
})();
