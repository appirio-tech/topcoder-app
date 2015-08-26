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
    vm.distribution = {};
    vm.selectSubTrack = selectSubTrack;
    vm.back = back;

    activate();

    function activate() {
      ProfileService.getDistributionStats(vm.track, vm.subTrack).then(function(data) {
        vm.distribution = data;
      });
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
      // profileVm.pastChallengesPromise.then(function(data) {

      // });
    }

    function selectSubTrack(subTrack) {
      $state.go('profile.subtrack', {track: vm.track, subTrack: subTrack});
    }

    function back() {
      $window.history.back();
    }

  }


})();
