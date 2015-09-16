(function () {
  'use strict';

  angular.module('tc.profile').controller('ProfileAboutController', ProfileAboutController);

  ProfileAboutController.$inject = ['$log', '$scope', 'ProfileService', 'ExternalAccountService'];

  function ProfileAboutController($log, $scope, ProfileService, ExternalAccountService) {
    var vm = this;
    $log = $log.getInstance("ProfileAboutController");

    var profileVm = $scope.$parent.profileVm;
    vm.categoryIndex = 0;
    vm.skillIndex = 0;
    vm.imgMap = {};

    activate();

    function activate() {
      ExternalAccountService.getLinkedExternalLinksData(profileVm.userHandle)
      .then(function(data) {
        vm.linkedExternalAccountsData = data.plain();
      });

      profileVm.statsPromise.then(function() {
        vm.categories = profileVm.categories;
      });
      profileVm.skillsPromise.then(function() {
        vm.skills = profileVm.skills;
      });
    }

    vm.imgMap = {
      'DEVELOP': 'develop',
      'DESIGN': 'design',
      'DATA_SCIENCE': 'data'
    };

  }
})();
