(function() {
  'use strict';

  angular.module('tc.account').controller('ResetPasswordController', ResetPasswordController);

  ResetPasswordController.$inject = ['$state', '$location', 'UserService'];

  function ResetPasswordController($state, $location, UserService) {
    var vm = this;
    vm.token = $location.search().token;
    vm.handle = $location.search().handle;

    vm.clearState = function() {
      vm.resetTokenSent = false;
      vm.resetTokenFailed = false;
      vm.alreadySent = false;
      vm.emailNotFound = false;
      vm.resetError = false;
    };
    vm.clearState();

    vm.sendLink = function() {
      if (vm.generateTokenForm.$valid) {
        UserService.generateResetToken(vm.email).then(
          function() {
            vm.resetTokenSent = true;
          },
          function(err) {
            if (err.status == 400)
              vm.alreadySent = true;
            else if (err.status == 404)
              vm.emailNotFound = true;
              
            vm.resetTokenFailed = true;
          }
        );
      }
    }
    
    vm.resetPassword = function() {
      if (vm.resetPasswordForm.$valid) {
        UserService.resetPassword(vm.handle, vm.password, vm.token).then(
          function() {
            $state.go('login');
          },
          function(err) {
            vm.resetFailed = true;
          }
        );
      }
    }
  }
})();
