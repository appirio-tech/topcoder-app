(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('SubtrackStatsController', SubtrackStatsController);

  SubtrackStatsController.$inject = ['ProfileService', 'userIdentity', '$window'];

  function SubtrackStatsController(ProfileService, userIdentity, $window) {
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
        vm.subtrackRanks = subtrackRanks;
        vm.hasRanks = !!vm.subtrackRanks.length;

        buildCarouselSlide();

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

    function buildCarouselSlide(numItemsPerSlide) {
      var subtrackRanksCollection = [];
      var slide = [];
      // Might be able to change number of subtracks per slide based
      // on screen size if the width of each subtrack is consistent:
      // http://stackoverflow.com/questions/26252038/multi-item-responsive-carousel
      numItemsPerSlide = numItemsPerSlide || 4;

      console.log('origin collection: ', vm.subtrackRanks);
      for(var i = 0; i < vm.subtrackRanks.length; i++) {
        if (slide.length === numItemsPerSlide) {
          // When slide is full, push it to collection and make a new slide []
          subtrackRanksCollection.push(slide);
          slide = [];
        }
        slide.push(vm.subtrackRanks[i]);
      }
      subtrackRanksCollection.push(slide);
      vm.subtrackRanksCollection = subtrackRanksCollection;
      console.log(vm.subtrackRanksCollection);
    }
  }
})();
