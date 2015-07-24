(function () {

  angular
    .module('tc.profile')
    .controller('ProfileAboutController', ProfileAboutController);

  ProfileAboutController.$inject = ['$scope', 'ProfileService'];

  function ProfileAboutController($scope, ProfileService) {
    var vm = this;
    vm.profile = {};

    activate();

    function activate() {
      vm.mockProfile = ProfileService.getMockMemberProfile();
      $scope.initProfile(vm);
    }

  }


})();
