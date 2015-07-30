(function () {

  angular
    .module('tc.profile')
    .controller('ProfileAboutController', ProfileAboutController);

  ProfileAboutController.$inject = ['$scope', 'ProfileService'];

  function ProfileAboutController($scope, ProfileService) {
    var vm = this;
    vm.profile = {};
    vm.mockProfile = ProfileService.getMockMemberProfile();
    vm.categoryIndex = 0;
    vm.skillIndex = 0;
    vm.shiftCategories = shiftCategories;
    vm.shiftSkills = shiftSkills;

    activate();

    function activate() {
      $scope.initProfile(vm);
    }

    function shiftCategories(x) {
      if (vm.categories && vm.categories.length !== 0) {
        if (x < 0 && vm.categoryIndex > 0) {
          vm.categoryIndex--;
        }
        else if (x > 0 && vm.categoryIndex < vm.categories.length - 4) {
          vm.categoryIndex++;
        }
      }
    }

    function shiftSkills(x) {
      if (vm.skills && vm.skills.length !== 0) {
        if (x < 0 && vm.skillIndex > 0) {
          vm.skillIndex--;
        }
        else if (x > 0 && vm.skillIndex < vm.skills.length - 5) {
          vm.skillIndex++;
        }
      }
     
    }

  }


})();
