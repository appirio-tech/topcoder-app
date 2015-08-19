(function () {
  'use strict';

  angular.module('tc.settings').controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['userData'];

  function EditProfileController(userData) {
    var vm = this;
    vm.updatePassword = updatePassword;
    vm.userData = userData;

    activate();

    function activate() {
    }

    function updatePassword() {

    }
  }
})();
