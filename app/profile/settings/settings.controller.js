(function () {
  'use strict';

  angular.module('tc.profile').controller('ProfileSettingsController', ProfileSettingsController);

  ProfileSettingsController.$inject = ['ProfileService'];

  function ProfileSettingsController(ProfileService) {
    var vm = this;

    activate();

    function activate() {

    }
})();
