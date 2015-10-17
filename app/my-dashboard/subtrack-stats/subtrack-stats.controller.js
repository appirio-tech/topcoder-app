(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('SubtrackStatsController', SubtrackStatsController);

  SubtrackStatsController.$inject = ['$filter', 'ProfileService', 'userIdentity'];

  function SubtrackStatsController($filter, ProfileService, userIdentity) {
    var vm = this;
    vm.loading = true;

    activate();

    function activate() {
      vm.handle = userIdentity.handle;

      ProfileService.getUserStats(vm.handle)
      .then(function(stats) {
        var trackRanks = ProfileService.getRanks(stats);
        var subtrackRanks = compileSubtracks(trackRanks);

        processStats(subtrackRanks);
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

    function compileSubtracks(trackRanks) {
      return _.reduce(trackRanks, function(result, subtracks, track) {
        if (Array.isArray(subtracks) && subtracks.length) {
          if (track === 'DEVELOP') {
            _.remove(subtracks, function(subtrackObj) {
              return subtrackObj.subTrack === 'COPILOT_POSTING';
            });
          }

          return result.concat(subtracks);

        } else {
          return result;
        }
      }, []);
    }

    function processStats(subtrackRanks) {
      angular.forEach(subtrackRanks, function(subtrack) {
        if (subtrack.track === 'DESIGN') {
          subtrack.stat = subtrack.wins;
          subtrack.statType = 'Wins';
        } else if (subtrack.track === 'COPILOT') {
          subtrack.stat = subtrack.activeContests;
          subtrack.statType = 'Challenges';
        } else {
          subtrack.stat = subtrack.rating;
          subtrack.statType = 'Rating';
        }
      });
    }
  }
})();
