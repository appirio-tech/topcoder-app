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
      var handle = userIdentity.handle;

      ProfileService.getUserStats(handle)
      .then(function(stats) {
        var subtrackRanks = [];

        var trackRanks = ProfileService.getRanks(stats);
        angular.forEach(trackRanks, function(subtracks, track) {
          if (Array.isArray(subtracks) && subtracks.length) {
            subtrackRanks = subtrackRanks.concat(subtracks);
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
