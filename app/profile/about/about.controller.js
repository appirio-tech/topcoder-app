(function () {
  'use strict';

  angular.module('tc.profile').controller('ProfileAboutController', ProfileAboutController);

  ProfileAboutController.$inject = ['$log', '$scope', 'ProfileService'];

  function ProfileAboutController($log, $scope, ProfileService) {
    var vm = this;
    var profileVm = $scope.$parent.profileVm;
    vm.categoryIndex = 0;
    vm.skillIndex = 0;

    activate();

    function activate() {
      vm.mockProfile = ProfileService.getMockMemberProfile();
      profileVm.statsPromise.then(function() {
        vm.categories = profileVm.categories;
      });
      profileVm.skillsPromise.then(function() {
        vm.skills = profileVm.skills;
      });
    }

  }
})();
