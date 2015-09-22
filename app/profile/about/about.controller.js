(function () {
  'use strict';

  angular.module('tc.profile').controller('ProfileAboutController', ProfileAboutController);

  ProfileAboutController.$inject = ['$log', '$scope', 'ProfileService', 'ExternalAccountService'];

  function ProfileAboutController($log, $scope, ProfileService, ExternalAccountService, UserService) {
    var vm = this;
    $log = $log.getInstance("ProfileAboutController");

    var profileVm = $scope.$parent.profileVm;
    vm.categoryIndex = 0;
    vm.skillIndex = 0;
    vm.displaySection = {};
    vm.sampleSkills = [
      {"tagName":"VisualForce","hidden":false,"score":0,"sources":[]},
      {"tagName":"MongoDB","hidden":false,"score":0,"sources":[]},
      {"tagName":"Heroku","hidden":false,"score":0,"sources":[]}
    ];

    activate();

    function activate() {

      profileVm.externalLinksPromise.then(function() {
        vm.linkedExternalAccountsData = profileVm.linkedExternalAccountsData;
        // show section if user is viewing his/her own profile OR if we have data
        vm.hasLinks = _.any(_.valuesIn(_.omit(vm.linkedExternalAccountsData, ['userId', 'updatedAt','createdAt','createdBy','updatedBy','handle'])));
        vm.displaySection.externalLinks = profileVm.showEditProfileLink || vm.hasLinks;
      });

      profileVm.statsPromise.then(function() {
        vm.categories = profileVm.categories;
        vm.marathonRating = profileVm.categories['MARATHON'] && profileVm.categories['MARATHON'].rating;
        vm.SRMRating = profileVm.categories['SRM'] && profileVm.categories['SRM'].rating;
        console.log(vm.marathonRating + ' ' + vm.SRMRating)
      });

      profileVm.skillsPromise.then(function() {
        // show section if user is viewing his/her own profile OR if we have data
        vm.fullSkills = profileVm.skills;
        vm.someSkills = profileVm.skills.slice(0, 9);
        vm.skills = vm.someSkills;
        vm.displaySection.skills = profileVm.showEditProfileLink || !!vm.skills.length;
      });
    }

  }
})();
