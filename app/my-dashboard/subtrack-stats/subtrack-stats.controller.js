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

    function processStats(ranks) {
      angular.forEach(ranks, function(rank) {
        if (rank.track === 'DESIGN') {
          rank.stat = rank.wins;
          rank.statType = 'Wins';
        } else if (rank.track === 'COPILOT') {
          rank.stat = rank.activeContests;
          rank.statType = 'Challenges';
        } else if (rank.track === 'DEVELOP') {
          if (['CODE', 'FIRST_2_FINISH'].indexOf(rank.subTrack) != -1) {
            rank.stat = rank.wins;
            rank.statType = 'Wins';
          } else {
            rank.stat = rank.rating;
            rank.statType = 'Rating';
          }
        } else {
          rank.stat = rank.rating;
          rank.statType = 'Rating';
        }
      });
    }
  }
})();
