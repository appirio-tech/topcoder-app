(function () {
  'use strict';

  angular.module('tc.settings').controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = [];

  function EditProfileController() {
    var vm = this;
    vm.testValue = 'testValue';

    activate();

    function activate() {
      console.log('Edit Profile Controller activated.');
    }

  }
})();
