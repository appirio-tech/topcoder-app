(function () {
  'use strict';

  angular.module('tc.settings').controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['userData', 'ProfileService', '$log', 'ISO3166'];

  function EditProfileController(userData, ProfileService, $log, ISO3166) {
    var vm = this;
    vm.updateProfile  = updateProfile;
    vm.toggleTrack    = toggleTrack;
    vm.updateCountry = updateCountry;

    if (userData.tracks === null) {
      userData.tracks = [];
    }

    activate();

    function activate() {
      vm.countries = ISO3166.getAllCountryObjects();
      vm.countryObj = ISO3166.getCountryObjFromAlpha3(userData.competitionCountryCode);

      processData(userData);
      vm.userData = userData.plain();
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

    function toggleTrack(track) {
      vm.tracks[track] = !vm.tracks[track];
    }

    function updateCountry(angucompleteCountryObj) {
        // update country
        var countryCode = _.get(angucompleteCountryObj, 'originalObject.alpha3', undefined);
        vm.userData.competitionCountryCode = countryCode;

        var valid = _.isUndefined(countryCode) ? false : true;
        vm.editProfile.location.$setValidity('required', valid);
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
