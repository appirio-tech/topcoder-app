(function () {

  angular
    .module('tc.profile')
    .controller('ProfileDevelopController', ProfileDevelopController);

  ProfileDevelopController.$inject = ['$scope', 'ProfileService', '$q', '$stateParams', 'ChallengeService', 'CONSTANTS'];

  function ProfileDevelopController($scope, ProfileService, $q, $stateParams, ChallengeService, CONSTANTS) {
    var vm = this;
    vm.subTrack = $stateParams.subTrack;
    vm.viewing = 'stats';
    vm.domain = CONSTANTS.domain;
    vm.challenges = [];
    vm.profile = {};

    activate();

    function activate() {
      // vm.mockProfile = ProfileService.getMockMemberProfile();
      $scope.initProfile(vm);
      vm.deferred = $q.defer();
      vm.deferred.promise.then(function() {
        vm.typeStats = ProfileService.getChallengeTypeStats(vm.stats, 'develop', vm.subTrack.toLowerCase().replace(/ /g, ''));
        ChallengeService.getChallenges({
          filter: 'userId=' + vm.profile.userId
        }).then(function(data) {
          vm.challenges = data;
        });
      });
    }

  }


})();
