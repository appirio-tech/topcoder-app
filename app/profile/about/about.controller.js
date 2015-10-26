(function () {
  'use strict';

  angular.module('tc.profile').controller('ProfileAboutController', ProfileAboutController);

  ProfileAboutController.$inject = ['$log', '$scope', 'ProfileService', 'ExternalAccountService', 'UserService', 'CONSTANTS'];

  function ProfileAboutController($log, $scope, ProfileService, ExternalAccountService, UserService, CONSTANTS) {
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

    ExternalAccountService.getLinkedExternalLinksData(profileVm.userHandle).then(function(data) {
        vm.linkedExternalAccountsData = data.plain();

        // show section if user is viewing his/her own profile OR if we have data
        //vm.hasLinks = profileVm.linkedExternalAccounts.length;
        vm.hasLinks = _.any(_.valuesIn(_.omit(vm.linkedExternalAccountsData, ['userId', 'updatedAt','createdAt','createdBy','updatedBy','handle'])));
        vm.displaySection.externalLinks = profileVm.showEditProfileLink || vm.hasLinks;

        // if user is authenticated, call for profiles end point
        if (profileVm.isUser) {
          var userId = UserService.getUserIdentity().userId;
          ExternalAccountService.getLinkedExternalAccounts(userId).then(function(data) {
            vm.linkedExternalAccounts = data;
            profileVm.status.externalLinks = CONSTANTS.STATE_READY;
          }).catch(function(err) {
            profileVm.status.externalLinks = CONSTANTS.STATE_ERROR;
          });
        } else {
          vm.linkedExternalAccounts = [];
          // remove all keys except the provider keys
          var accounts = _.omit(vm.linkedExternalAccountsData, ['userId', 'updatedAt','createdAt','createdBy','updatedBy','handle']);
          // populate the externalLinks for external-account-data directive with info from ext accounts data
          for(var provider in accounts) {
            if (accounts[provider]) {
              vm.linkedExternalAccounts.push({
                providerType: provider
              });
            }
          }
          profileVm.status.externalLinks = CONSTANTS.STATE_READY;
        }
      }).catch(function(err) {
        profileVm.status.externalLinks = CONSTANTS.STATE_ERROR;
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
        vm.someSkills = profileVm.skills.slice(0, 10);
        vm.skills = vm.someSkills;
        vm.displaySection.skills = profileVm.showEditProfileLink || !!vm.skills.length;
      });
    }

  }
})();
