(function () {
  'use strict';

  angular.module('tc.settings').controller('AccountInfoController', AccountInfoController);

  AccountInfoController.$inject = ['UserService', '$log'];

  function AccountInfoController(UserService, $log) {
    var vm = this;
    vm.defaultPlaceholder = 'Enter New Password';
    vm.submitNewPassword  = submitNewPassword;

    activate();

    function activate() {
      var user    = UserService.getUserIdentity();

      vm.username = user.handle;
      vm.email    = user.email;
    }

    function submitNewPassword() {
      var resetToken = 'something';

      UserService.resetPassword(vm.username, vm.password, resetToken)
      .then(function() {
        vm.password = '';
        vm.currentPassword = '';
      })
      .catch(function(err) {
        console.log('See the following error message:');
        $log.error(err);
      });
    }
  }
})();
