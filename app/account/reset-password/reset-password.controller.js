(function() {
  'use strict';

  angular.module('tc.account').controller('ResetPasswordController', ResetPasswordController);

  ResetPasswordController.$inject = ['$log'];

  function ResetPasswordController($log) {
    var vm = this;
    vm.name = 'reset-password';
  }
})();
