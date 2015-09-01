(function () {
  'use strict';

  angular.module('tc.settings').controller('UpdatePasswordController', UpdatePasswordController);

  UpdatePasswordController.$inject = ['UserService', '$log'];

  function UpdatePasswordController(UserService, $log) {
    var vm = this;
    vm.submitNewPassword = submitNewPassword;
    var user = UserService.getUserIdentity();

    activate();

    function activate() {
      vm.defaultPlaceholder = 'Enter New Password';
      vm.username = user.handle;
      vm.email    = user.email;
    }

    function submitNewPassword() {
      UserService.updatePassword(vm.password, vm.currentPassword)
      .then(function() {
        vm.password = '';
        vm.currentPassword = '';
        alert('Your password has been updated.');
      })
      .catch(function(err) {
        $log.error(err);
      });
    }
  }
})();
