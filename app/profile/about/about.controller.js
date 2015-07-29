(function () {

  angular
    .module('tc.profile')
    .controller('ProfileAboutController', ProfileAboutController);

  ProfileAboutController.$inject = ['$scope', 'ProfileService'];

  function ProfileAboutController($scope, ProfileService) {
    var vm = this;
    vm.profile = {};
    vm.mockProfile = ProfileService.getMockMemberProfile();
    activate();

    function activate() {
      $scope.initProfile(vm);
    }

  }


})();
