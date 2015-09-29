(function () {
  'use strict';

  angular.module('tc.settings').controller('EditProfileController', EditProfileController);


  EditProfileController.$inject = ['userData', 'userHandle', 'ProfileService', 'ExternalAccountService', '$log', 'ISO3166', 'ImageService', '$rootScope', 'CONSTANTS', 'TagsService'];

  function EditProfileController(userData, userHandle, ProfileService, ExternalAccountService, $log, ISO3166, ImageService, $rootScope, CONSTANTS, TagsService) {
    $log = $log.getInstance("EditProfileCtrl");
    var vm = this;
    vm.toggleTrack    = toggleTrack;
    vm.updateCountry  = updateCountry;
    vm.onFileChange   = onFileChange;
    vm.updateProfile  = updateProfile;
    vm.linkedExternalAccounts = [];
    vm.skills = false;
    vm.addSkill = addSkill;
    vm.tags = [];
    vm.profileFormProcessing = false;
    vm.tracks = {};

    activate();

    function activate() {
      vm.countries = ISO3166.getAllCountryObjects();
      vm.countryObj = ISO3166.getCountryObjFromAlpha3(userData.competitionCountryCode);

      processData(userData);
      vm.userData = userData;

      ExternalAccountService.getLinkedExternalLinksData(userHandle).then(function(data) {
        vm.linkedExternalAccounts = data.plain();
        vm.hasLinks = _.any(_.valuesIn(_.omit(vm.linkedExternalAccounts, ['userId', 'updatedAt','createdAt','createdBy','updatedBy','handle'])));

        console.log('ext');
        console.log(vm.hasLinks);
        console.log(vm.linkedExternalAccounts)
      })
      .catch(function(err) {
        $log.error(JSON.stringify(err));
      });


      TagsService.getApprovedSkillTags()
      .then(function(tags) {
        vm.tags = tags;
      })
      .catch(function(err) {
        $log.error(JSON.stringify(err));
      });

      ProfileService.getUserSkills(vm.userData.handle)
      .then(function(skills) {
        vm.skills = skills.skills;
      })
      .catch(function(err) {
        $log.error(JSON.stringify(err));
      });
    }

    function addSkill(skill) {
      if (skill) {
        var skillTagId = _.get(skill, 'originalObject.id').toString();
        ProfileService.addUserSkill(vm.userData.handle, skillTagId).then(function(resp) {
          // find the new skill in response object and inject it into our existing list.
          // we dont want to replace the entire object / map  because we will lose hidden tags
          var newSkill = _.find(resp.skills, {tagId: skillTagId});
          vm.skills.push(newSkill);
        });
      }
    }

    function updateCountry(angucompleteCountryObj) {
        var countryCode = _.get(angucompleteCountryObj, 'originalObject.alpha3', undefined);
        vm.userData.competitionCountryCode = countryCode;

        var isValidCountry = _.isUndefined(countryCode) ? false : true;
        vm.editProfile.location.$setValidity('required', isValidCountry);
    }

    function onFileChange(file) {
      ImageService.getPresignedUrl(userHandle, file)
      .then(ImageService.uploadFileToS3)
      .then(ImageService.createFileRecord)
    }

    function updateProfile() {
      vm.profileFormProcessing = true;
      vm.userData.tracks = _.reduce(vm.tracks, function(result, isInterested, trackName) {
        if (isInterested) {
          result.push(trackName);
        }
        return result;
      }, []);

      ProfileService.updateUserProfile(vm.userData)
      .then(function() {
        vm.profileFormProcessing = false;
        $log.info('Saved successfully');
      })
      .catch(function(err) {
        vm.profileFormProcessing = false;
        $log.error(err);
      });
    }

    function toggleTrack(track) {
      vm.tracks[track] = !vm.tracks[track];
    }

    function processData(userInfo) {
      vm.tracks = {
        DESIGN: _.contains(userData.tracks, 'DESIGN'),
        DEVELOP: _.contains(userData.tracks, 'DEVELOP'),
        DATA_SCIENCE: _.contains(userData.tracks, 'DATA_SCIENCE'),
      };
    }
  }
})();
