(function () {

  angular
    .module('tc.profile')
    .controller('ProfileDevelopController', ProfileDevelopController);

  ProfileDevelopController.$inject = ['$scope', 'ProfileService', '$q', '$stateParams', 'ChallengeService', 'CONSTANTS'];

  function ProfileDevelopController($scope, ProfileService, $q, $stateParams, ChallengeService, CONSTANTS) {
    var vm = this;
    vm.subTrack = $stateParams.subTrack;
    vm.track = $stateParams.track;
    vm.viewing = 'challenges';
    vm.domain = CONSTANTS.domain;
    vm.challenges = [];
    var profileVm = $scope.$parent.profileVm;
    activate();

    function activate() {
      profileVm.statsPromise.then(function(data) {
        vm.typeStats = ProfileService.getChallengeTypeStats(
          profileVm.stats, 'develop',
          vm.subTrack.toLowerCase().replace(/ /g, '')
        );
      });
      // profileVm.pastChallengesPromise.then(function(data) {

      // });
    }
  }


})();
