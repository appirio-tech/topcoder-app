(function () {
  'use strict';

  angular.module('tc.settings').controller('AccountInfoController', AccountInfoController);

  AccountInfoController.$inject = ['UserService'];

  function AccountInfoController(UserService) {
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

      })
      .catch(function(err) {
        console.log('See the following error message:');
        $log.error(err);
      });
    }
  }
})();
