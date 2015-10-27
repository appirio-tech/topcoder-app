(function () {
  'use strict';

  angular.module('tc.settings').controller('EditProfileController', EditProfileController);


  EditProfileController.$inject = ['userData', 'userHandle', 'ProfileService', 'ExternalAccountService', '$log', 'ISO3166', 'ImageService', 'CONSTANTS', 'TagsService', 'toaster'];

  function EditProfileController(userData, userHandle, ProfileService, ExternalAccountService, $log, ISO3166, ImageService, CONSTANTS, TagsService, toaster) {
    $log = $log.getInstance("EditProfileCtrl");
    var vm = this;
    vm.toggleTrack    = toggleTrack;
    vm.updateCountry  = updateCountry;
    vm.onFileChange   = onFileChange;
    vm.updateProfile  = updateProfile;
    vm.addSkill = addSkill;
    vm.deleteImage = deleteImage;
    vm.changeImage = changeImage;

    activate();

    function activate() {
      vm.userData = userData.clone();
      vm.originalUserData = userData;
      vm.linkedExternalAccounts = [];
      vm.linkedExternalAccountsData = {};
      vm.skills = false;
      vm.tags = [];
      vm.profileFormProcessing = false;
      vm.tracks = {};

      vm.countries = ISO3166.getAllCountryObjects();
      vm.countryObj = ISO3166.getCountryObjFromAlpha3(vm.userData.competitionCountryCode);

      processData(vm.userData);

      ExternalAccountService.getLinkedExternalAccounts(vm.userData.userId).then(function(data) {
        vm.linkedExternalAccounts = data;
      });

      ExternalAccountService.getLinkedExternalLinksData(userHandle).then(function(data) {
        vm.linkedExternalAccountsData = data.plain();
        vm.hasLinks = _.any(_.valuesIn(_.omit(vm.linkedExternalAccountsData, ['userId', 'updatedAt','createdAt','createdBy','updatedBy','handle'])));
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
        vm.skills = _.map(skills.skills, function(el) {
          return _.extend({}, el, {isNew: 0});
        });
      })
      .catch(function(err) {
        $log.error(JSON.stringify(err));
      });
    }

    function addSkill(skill) {
      if (skill) {
        var skillTagId = _.get(skill, 'originalObject.id').toString();

        var isSkillAlreadyAdded = _.find(vm.skills, function(s) { return s.tagId == skillTagId});

        if (!isSkillAlreadyAdded) {
          ProfileService.addUserSkill(vm.userData.handle, skillTagId).then(function(resp) {
            // find the new skill in response object and inject it into our existing list.
            // we dont want to replace the entire object / map  because we will lose hidden tags
            var newSkill = _.find(resp.skills, {tagId: skillTagId});
            newSkill.isNew = new Date().getTime();
            vm.skills.push(newSkill);
            toaster.pop('success', 'Success!', 'Skill added.');
          });
        } else {
          toaster.pop('note', null, 'You\'ve already added that skill.');
        }
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
      .then(function(newPhotoURL) {
        vm.userData.photoURL = newPhotoURL;
      });
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
        toaster.pop('success', "Success!", "Your account information was updated.");
        for (var k in vm.userData) userData[k] = vm.userData[k];
      })
      .catch(function(err) {
        vm.profileFormProcessing = false;
        $log.error(err);
        toaster.pop('error', "Whoops!", "Something went wrong. Please try again later.");
      });
    }

    function toggleTrack(track) {
      vm.tracks[track] = !vm.tracks[track];
    }

    function processData(userInfo) {
      vm.tracks = {
        DESIGN: _.contains(userInfo.tracks, 'DESIGN'),
        DEVELOP: _.contains(userInfo.tracks, 'DEVELOP'),
        DATA_SCIENCE: _.contains(userInfo.tracks, 'DATA_SCIENCE'),
      };
    }

    function deleteImage() {
      var userData = vm.originalUserData;
      var oldPhotoURL = userData.photoURL;
      delete userData['photoURL'];
      userData.tracks = userData.tracks || [];
      ProfileService.updateUserProfile(userData)
      .then(function() {
        vm.userData.photoURL = '';
        $log.info('Saved successfully');
        toaster.pop('success', "Success!", "Your account information was updated.");
      })
      .catch(function(err) {
        vm.profileFormProcessing = false;
        $log.error(err);
        vm.userData.photoURL = oldPhotoURL;
        vm.originalUserData.photoURL = oldPhotoURL;
        toaster.pop('error', "Whoops!", "Something went wrong. Please try again later.");
      });
    }

    function changeImage() {
      var fileInput = document.querySelector('#change-image-input');
      fileInput.click(); // Or, use the native click() of the file input.
    }
  }
})();
