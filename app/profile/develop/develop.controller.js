(function () {

  angular
    .module('tc.profile')
    .controller('ProfileDevelopController', ProfileDevelopController);

  ProfileDevelopController.$inject = ['$scope', 'ProfileService', 'type', '$q'];

  function ProfileDevelopController($scope, ProfileService, type, $q) {
    var vm = this;
    vm.type = type || 'assemblycompetition';
    vm.profile = {};

    activate();

    function activate() {
      vm.mockProfile = ProfileService.getMockMemberProfile();
      $scope.initProfile(vm);
      vm.deferred = $q.defer();
      vm.deferred.promise.then(function() {
        vm.typeStats = ProfileService.getChallengeTypeStats(vm.stats, 'develop', vm.type);
        console.log(vm.typeStats);
      });
    }

  }


})();
