(function () {

  angular
    .module('tc.profile')
    .controller('ProfileDevelopController', ProfileDevelopController);

  ProfileDevelopController.$inject = ['$scope', 'ProfileService', '$q', '$stateParams'];

  function ProfileDevelopController($scope, ProfileService, $q, $stateParams) {
    var vm = this;
    vm.subTrack = $stateParams.subTrack;
    // vm.profile = {};

    activate();

    function activate() {
      // vm.mockProfile = ProfileService.getMockMemberProfile();
      $scope.initProfile(vm);
      vm.deferred = $q.defer();
      vm.deferred.promise.then(function() {
        vm.typeStats = ProfileService.getChallengeTypeStats(vm.stats, 'develop', vm.subTrack.toLowerCase().replace(/ /g, ''));
      });
    }

  }


})();
