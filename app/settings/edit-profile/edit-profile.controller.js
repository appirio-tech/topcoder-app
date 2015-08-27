(function () {
  'use strict';

  angular.module('tc.settings').controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['userData', 'userHandle', 'ProfileService', '$log', 'ISO3166', 'ImageService'];

  function EditProfileController(userData, userHandle, ProfileService, $log, ISO3166, ImageService) {
    var vm = this;
    vm.toggleTrack    = toggleTrack;
    vm.updateCountry  = updateCountry;
    vm.onFileChange   = onFileChange;
    vm.updateImage    = updateImage;
    vm.updateProfile  = updateProfile;

    vm.countries = ISO3166.getAllCountryObjects();
    vm.countryObj = ISO3166.getCountryObjFromAlpha3(userData.competitionCountryCode);

    if (userData.tracks === null) {
      userData.tracks = [];
    }

    activate();

    function activate() {
      processData(userData);
      vm.userData = userData.plain();
    }


    function toggleTrack(track) {
      vm.tracks[track] = !vm.tracks[track];
    }

    function updateCountry(angucompleteCountryObj) {
        var countryCode = _.get(angucompleteCountryObj, 'originalObject.alpha3', undefined);
        vm.userData.competitionCountryCode = countryCode;

        var valid = _.isUndefined(countryCode) ? false : true;
        vm.editProfile.location.$setValidity('required', valid);
    }

    function onFileChange(file) {
      ImageService.getPresignedUrl(userHandle)
      .then(function(res) {
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        formData.append(file.name, file);

        xhr.onreadystatechange = function() {
          var status = xhr.status;
          if ((status >= 200 && status < 300) || status === 304) {
            ImageService.createFileRecord(userHandle, {param: {token: res.token}})
            .then(function(res) {
              $log.info('Successfully made file record.');
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

        xhr.open('PUT', res.preSignedURL, true);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(formData);
      })
      .catch(function(err) {
        $log.info('Error getting presigned url');
        $log.error(err);
      });
    }

    function updateImage() {
      ImageService.updateImage()
      .then(function(res) {
        vm.token = res.token;
        vm.presignedUrl = res.presignedUrl;
      })
      .catch(function(err){
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

      var body = vm.userData;

      ProfileService.updateUserProfile(body)
      .then(function() {
        $log.info('Saved successfully');
      })
      .catch(function(err) {
        $log.error(err);
      });
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
