(function () {
  'use strict';

  angular.module('tc.settings').controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['userData', 'ProfileService', '$log'];

  function EditProfileController(userData, ProfileService, $log) {
    var vm = this;
    vm.updateProfile = updateProfile;
    vm.toggleTrack   = toggleTrack;

    if (userData.tracks === null) {
      userData.tracks = [];
    }

    console.log('userData: ', userData.plain());

    activate();

    function activate() {
      processData(userData);
      vm.userData = userData;
    }

    function updateProfile() {
      vm.userData.tracks = _.reduce(vm.tracks, function(result, isInterested, trackName) {
        if (isInterested) {
          result.push(trackName);
        }
        return result;
      }, []);

      var body = vm.userData;

      $log.info('Before saving: ');
      $log.info(body.plain());

      ProfileService.updateUserProfile(body)
      .then(function(data) {
        $log.info('Saved successfully: ');
        $log.info(data);
      })
      .catch(function(err) {
        $log.error(err);
      });
    }

    function toggleTrack(track) {
      vm.tracks[track] = !vm.tracks[track];
    }

    function processData(userInfo) {
      _.each(userInfo.tracks, function(track, i) {
        userInfo.tracks[i] = track.toLowerCase();
      });

      vm.tracks = {
        design: _.contains(userData.tracks, 'design') || false,
        development: _.contains(userData.tracks, 'development') || false,
        data_science: _.contains(userData.tracks, 'data_science') || false,
      };
    }
  }
})();
