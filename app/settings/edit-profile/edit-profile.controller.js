(function () {
  'use strict';

  angular.module('tc.settings').controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['userData'];

  function EditProfileController(userData) {
    var vm = this;
    vm.userData      = userData;

    vm.updateProfile = updateProfile;
    vm.toggleTrack   = toggleTrack;

    activate();

    function activate() {
    }

    function updateProfile() {

    }

    function toggleTrack(track) {
      console.log('here');
      console.log(vm.userData.tracks[track]);
      vm.userData.tracks[track] = !vm.userData.tracks[track];
    }
  }
})();
