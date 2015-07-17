(function() {
  'use strict';

  angular.module('tc.account').controller('ResetPasswordController', ResetPasswordController);

  ResetPasswordController.$inject = ['$log'];

  function ResetPasswordController($log) {
    var vm = this;

    vm.sendLink = function() {
      if (vm.resetPasswordForm.$valid) {
        // send link
        // auth.initiateResetPassword(vm.email).then(
        //   function() {
        //     // success
        //     $state.go('resetPasswordLinkConfirmation');
        //   },
        //   function(err) {
        //     $log.error(err);
        //   }
        // );
      }
    }

  }
})();
