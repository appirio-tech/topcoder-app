(function () {
  'use strict';

  angular.module('tc.settings').controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['userData', 'userHandle', 'ProfileService', '$log', 'ISO3166', 'ImageService'];

  function EditProfileController(userData, userHandle, ProfileService, $log, ISO3166, ImageService) {
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
      ImageService.getPresignedUrl(userHandle)
      .then(function(res) {
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        formData.append('userimage', file, file.name);

        xhr.open('PUT', res.preSignedURL, true);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');

        // xhr version of the success callback
        xhr.onreadystatechange = function() {
          var status = xhr.status;
          if (((status >= 200 && status < 300) || status === 304) && xhr.readyState === 4) {
            ImageService.createFileRecord(userHandle, {param: {token: res.token}})
            .then(function(res) {
              $log.info('Successfully made file record.');
              // TODO: Broadcast profile update event
            })
            .catch(function(err) {
              $log.info('Error in creating file record');
              $log.error(err);
            });
          }
        };

        xhr.onerror = function(res) {
          $log.info('Error uploading to s3');
          $log.error(res);
        }

        xhr.send(formData);
      })
      .catch(function(err) {
        $log.info('Error getting presigned url');
        $log.error(err);
      });
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
