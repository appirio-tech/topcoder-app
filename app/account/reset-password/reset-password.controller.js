(function() {
  'use strict';

  angular.module('tc.account').controller('ResetPasswordController', ResetPasswordController);

  ResetPasswordController.$inject = ['$state', '$stateParams', 'UserService', 'TcAuthService'];

  function ResetPasswordController($state, $stateParams, UserService, TcAuthService) {
    var vm = this;
    vm.token = $stateParams.token;
    vm.handle = $stateParams.handle;

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
