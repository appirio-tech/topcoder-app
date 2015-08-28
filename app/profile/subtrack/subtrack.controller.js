(function () {

  angular
    .module('tc.profile')
    .controller('ProfileSubtrackController', ProfileSubtrackController);

  ProfileSubtrackController.$inject = ['$scope', 'ProfileService', '$q', '$stateParams', 'ChallengeService', 'CONSTANTS', '$state', '$window'];

  function ProfileSubtrackController($scope, ProfileService, $q, $stateParams, ChallengeService, CONSTANTS, $state, $window) {
    var vm = this;
    vm.subTrack = decodeURIComponent($stateParams.subTrack || '') || '';
    vm.track = $stateParams.track;
    vm.viewing = 'challenges';
    vm.domain = CONSTANTS.domain;
    vm.challenges = [];
    var profileVm = $scope.$parent.profileVm;
    vm.dropdown = [];
    vm.ddSelected = {};
    vm.selectSubTrack = selectSubTrack;
    vm.back = back;
    vm.status = {
      'challenges': CONSTANTS.STATE_LOADING
    };

    activate();

    function activate() {
      profileVm.statsPromise.then(function(data) {
        vm.typeStats = ProfileService.getChallengeTypeStats(
          profileVm.stats,
          vm.track,
          vm.subTrack.toLowerCase().replace(/ /g, '')
        );
        if (vm.subTrack) {
          vm.dropdown = ProfileService.getSubTracks(profileVm.stats, vm.track.toLowerCase())
          .map(function(subtrack) {
            return {
              text: vm.track + ': ' + subtrack,
              value: subtrack
            };
          });
          vm.ddSelected = vm.dropdown.filter(function(selection) {
            return selection.value === vm.subTrack;
          })[0];
        } else {
          vm.ddSelected =  {
            text: 'Co-Pilot',
            value: 'Co-Pilot'
          };
        }

      });

      vm.pastChallengesPromise = ChallengeService.getUserChallenges(
        profileVm.profile.handle,
        {
          filter: {
            status: 'completed',
            track: vm.track,
            subTrack: vm.subTrack
          },
          orderBy: 'submissionEndDate desc'
        }
      )
      .then(function(data) {
        vm.challenges = data;
        vm.status.challenges = CONSTANTS.STATE_READY;
        return data;
      }).catch(function(err) {
        vm.status.challenges = CONSTANTS.STATE_ERROR;
      });
    }

    function selectSubTrack(subTrack) {
      $state.go('profile.subtrack', {track: vm.track, subTrack: subTrack});
    }

    function back() {
      $window.history.back();
    }

  }


})();
