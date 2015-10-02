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

    activate();

    function activate() {
      vm.handle = userIdentity.handle;

      ProfileService.getUserStats(vm.handle)
      .then(function(stats) {
        var subtrackRanks = [];

        var trackRanks = ProfileService.getRanks(stats);

        angular.forEach(trackRanks, function(subtracks, track) {

          if (Array.isArray(subtracks) && subtracks.length && track !== 'COPILOT') {
            subtrackRanks = subtrackRanks.concat(subtracks);
          }
        });

        angular.forEach(subtrackRanks, function(subtrack) {
          if (subtrack.track === 'DESIGN') {
            subtrack.stat = subtrack.wins;
            subtrack.statType = 'Wins';
          } else {
            subtrack.stat = subtrack.rating;
            subtrack.statType = 'Rating';
          }
        });

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
