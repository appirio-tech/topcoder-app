(function () {
  'use strict';

  angular.module('tc.settings').controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['userData', 'userHandle', 'ProfileService', '$log', 'ISO3166', 'ImageService', '$rootScope', 'CONSTANTS'];

  function EditProfileController(userData, userHandle, ProfileService, $log, ISO3166, ImageService, $rootScope, CONSTANTS) {
    var vm = this;
    vm.toggleTrack    = toggleTrack;
    vm.updateCountry  = updateCountry;
    vm.onFileChange   = onFileChange;
    vm.updateProfile  = updateProfile;

    activate();

    function activate() {
      vm.countries = ISO3166.getAllCountryObjects();
      vm.countryObj = ISO3166.getCountryObjFromAlpha3(userData.competitionCountryCode);

      processData(userData);
      vm.userData = userData
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
      vm.userData.tracks = _.reduce(vm.tracks, function(result, isInterested, trackName) {
        if (isInterested) {
          result.push(trackName);
        }
        return result;
      }, []);

      ProfileService.updateUserProfile(vm.userData)
      .then(function() {
        $log.info('Saved successfully');
      })
      .catch(function(err) {
        $log.error(err);
      });
    }

    function toggleTrack(track) {
      vm.tracks[track] = !vm.tracks[track];
    }

    function processData(userInfo) {
      vm.tracks = {
        design: _.contains(userData.tracks, 'DESIGN'),
        develop: _.contains(userData.tracks, 'DEVELOP'),
        data_science: _.contains(userData.tracks, 'DATA_SCIENCE'),
      };
    }
  }
})();
