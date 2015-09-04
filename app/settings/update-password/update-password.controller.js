(function () {
  'use strict';

  angular.module('tc.settings').controller('UpdatePasswordController', UpdatePasswordController);

  UpdatePasswordController.$inject = ['UserService', '$log', 'userData'];

  function UpdatePasswordController(UserService, $log, userData) {
    var vm = this;
    vm.submitNewPassword = submitNewPassword;

    activate();

    function activate() {
      vm.defaultPlaceholder = 'Enter New Password';
      vm.username = userData.handle;
      vm.email    = userData.email;
    }

    function submitNewPassword() {
      UserService.updatePassword(vm.password, vm.currentPassword)
      .then(function() {
        vm.password = '';
        vm.currentPassword = '';
        vm.newPasswordForm.$setPristine();
        vm.placeholder = vm.defaultPlaceholder;

        $log.info('Your password has been updated.');
      })
      .catch(function(err) {
        $log.error(err);
      });
    }
  }
})();
