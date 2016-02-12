import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.account').controller('ResetPasswordController', ResetPasswordController)

  ResetPasswordController.$inject = ['$state', '$stateParams', 'UserService', 'TcAuthService']

  function ResetPasswordController($state, $stateParams, UserService, TcAuthService) {
    var vm = this
    vm.token = $stateParams.token
    vm.handle = $stateParams.handle
    vm.defaultPlaceholder = 'Enter New Password'

    vm.clearState = function() {
      vm.resetTokenSent = false
      vm.resetTokenFailed = false
      vm.alreadySent = false
      vm.emailNotFound = false
      vm.resetError = false
    }
    vm.clearState()

    vm.sendLink = function() {
      if (vm.generateTokenForm.$valid) {
        vm.loading = true
        UserService.generateResetToken(vm.email).then(
          function() {
            vm.resetTokenSent = true
            vm.loading = false
          },
          function(err) {
            if (err.status == 400)
              vm.alreadySent = true
            else if (err.status == 404)
              vm.emailNotFound = true

            vm.resetTokenFailed = true
            vm.loading = false
          }
        )
      }
    }

    vm.resetPassword = function() {
      vm.loading = true
      if (vm.resetPasswordForm.$valid) {
        UserService.resetPassword(vm.handle, vm.password, vm.token).then(
          function() {
            TcAuthService.login(vm.handle, vm.password).then(
              function() {
                $state.go('dashboard', { 'notifyReset': true })
              },
              function(err) {
                $state.go('login', { 'notifyReset': true })
              }
            )
          },
          function(err) {
            vm.resetFailed = true
            vm.loading = false
          }
        )
      }
    }
  }
})()
