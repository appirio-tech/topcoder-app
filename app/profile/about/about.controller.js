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
      {"tagName":"VisualForce","hidden":false,"score":0,"sources":[], "tagId": 385},
      {"tagName":"MongoDB","hidden":false,"score":0,"sources":[], "tagId": 281},
      {"tagName":"Heroku","hidden":false,"score":0,"sources":[], "tagId": 210}
    ];

    activate();

    function activate() {

      profileVm.externalLinksPromise.then(function() {
        vm.linkedExternalAccountsData = profileVm.linkedExternalAccountsData;
        vm.linkedExternalAccounts = profileVm.linkedExternalAccounts;
        // show section if user is viewing his/her own profile OR if we have data
        vm.hasLinks = vm.linkedExternalAccounts.length;
        //vm.hasLinks = _.any(_.valuesIn(_.omit(vm.linkedExternalAccountsData, ['userId', 'updatedAt','createdAt','createdBy','updatedBy','handle'])));
        vm.displaySection.externalLinks = profileVm.showEditProfileLink || vm.hasLinks;
      });

      profileVm.statsPromise.then(function() {
        vm.categories = profileVm.categories;
        vm.marathonRating = profileVm.categories['MARATHON_MATCH'] && profileVm.categories['MARATHON_MATCH'].rating;
        vm.SRMRating = profileVm.categories['SRM'] && profileVm.categories['SRM'].rating;
        vm.displaySection.stats = profileVm.showEditProfileLink || vm.categories.DESIGN.length || vm.categories.DEVELOP.length || vm.categories.DATA_SCIENCE.length || vm.categories.COPILOT.length;
      });

      profileVm.skillsPromise.then(function() {
        // show section if user is viewing his/her own profile OR if we have data
        vm.fullSkills = profileVm.skills;
        vm.someSkills = profileVm.skills.slice(0, 6);
        vm.skills = vm.someSkills;
        vm.displaySection.skills = profileVm.showEditProfileLink || !!vm.skills.length;
      });
    }

  }
})();
