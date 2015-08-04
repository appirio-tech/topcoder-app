(function () {

  angular
    .module('tc.profile')
    .controller('ProfileDevelopController', ProfileDevelopController);

  ProfileDevelopController.$inject = ['$scope', 'ProfileService', '$q', '$stateParams', 'ChallengeService', 'CONSTANTS', '$state', '$window'];

  function ProfileDevelopController($scope, ProfileService, $q, $stateParams, ChallengeService, CONSTANTS, $state, $window) {
    var vm = this;
    vm.subTrack = $stateParams.subTrack;
    vm.track = $stateParams.track;
    vm.viewing = 'challenges';
    vm.domain = CONSTANTS.domain;
    vm.challenges = [];
    var profileVm = $scope.$parent.profileVm;
    vm.dropdown = [];
    vm.ddSelected = {};
    vm.selectSubTrack = selectSubTrack;
    vm.back = back;

    activate();

    function activate() {
      profileVm.statsPromise.then(function(data) {
        vm.typeStats = ProfileService.getChallengeTypeStats(
          profileVm.stats,
          vm.track,
          vm.subTrack.toLowerCase().replace(/ /g, '')
        );
        vm.dropdown = ProfileService.getSubTracks(profileVm.stats, vm.track.toLowerCase())
        .map(function(x) {
          return {
            text: 'Develop' + ': ' + x,
            value: x
          };
        });
        vm.ddSelected = vm.dropdown.filter(function(x) {
          return x.value === vm.subTrack;
        })[0];
      });
      // profileVm.pastChallengesPromise.then(function(data) {

      // });
    }

    function selectSubTrack(subTrack) {
      $state.go('profile.develop', {track: 'develop', subTrack: subTrack});
    }

    function back() {
      $window.history.back();
    }

  }


})();
