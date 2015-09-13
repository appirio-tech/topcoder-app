(function () {
  'use strict';

  angular.module('tc.settings').controller('UpdatePasswordController', UpdatePasswordController);

  UpdatePasswordController.$inject = ['UserService', '$log', 'userData', '$state'];

  function UpdatePasswordController(UserService, $log, userData, $state) {
    var vm = this;
    vm.submitNewPassword = submitNewPassword;

    activate();

    function activate() {
      vm.defaultPlaceholder = 'New Password';
      vm.currentPasswordDefaultPlaceholder = 'Current Password';
      vm.username = userData.handle;
      vm.email    = userData.email;
      vm.loaded   = false;

      UserService.getUserProfile({fields: 'credential'})
      .then(function(res) {
        vm.loaded = true;
        vm.isSocialRegistrant = res.credential.hasPassword;
      })
      .catch(function(err) {
        $log.error("Error fetching user profile. Redirecting to edit profile.");
        $state.go('settings.profile');
      });
    }

    function submitNewPassword() {
      UserService.updatePassword(vm.password, vm.currentPassword)
      .then(function() {
        vm.password = '';
        vm.currentPassword = '';
        vm.newPasswordForm.$setPristine();
        vm.currentPasswordFocus = false;
        vm.placeholder = vm.defaultPlaceholder;
        vm.currentPasswordPlaceholder = vm.currentPasswordDefaultPlaceholder;

        $log.info('Your password has been updated.');
      })
      .catch(function(err) {
        $log.error(err);
      });
    }
  }
})();
