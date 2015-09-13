(function () {
  'use strict';

  angular.module('tc.settings').controller('SettingsController', SettingsController);

  SettingsController.$inject = ['UserService'];

  function SettingsController(UserService) {
    var vm = this;

    activate();

    function activate() {
      UserService.getUserProfile({fields: 'credential'})
      .then(function(res) {
        vm.isSocialRegistrant = res.credential.hasPassword;
      })
      .catch(function(err) {
        $log.error("Error fetching user profile. Redirecting to edit profile.");
        $state.go('settings.profile');
      });
    }
  }

})();
