(function() {
  'use strict';

  angular.module('tc.account').controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', '$stateParams', '$location', '$scope', 'TcAuthService', 'AuthTokenService', 'UserService', 'NotificationService', 'Helpers', 'CONSTANTS'];

  function LoginController($log, $state, $stateParams, $location, $scope, TcAuthService, AuthTokenService, UserService, NotificationService, Helpers, CONSTANTS) {
    var vm = this;
    $log = $log.getInstance("LoginController");
    vm.$stateParams = $stateParams;
    vm.passwordReset = false;
    vm.usernameExists = true;
    vm.currentPasswordDefaultPlaceholder = "Password";
    vm.login = login;
    vm.socialLogin = socialLogin;
    vm.loginErrors = {};
    // reference for main vm
    var mainVm = $scope.$parent.main;

    activate();

    function activate() {
      if ($stateParams.notifyReset) {
        NotificationService.inform('Your new password has been set. Please log in. If you have any trouble, please contact support@topcoder.com.');
      }
    }

    function _doLogin(usernameOrEmail, password) {
      return TcAuthService.login(usernameOrEmail, password).then(function(data) {
        // success
        $log.debug('logged in');

        // setup login event for analytics tracking
        Helpers.setupLoginEventMetrices(usernameOrEmail);
        return Helpers.redirectPostLogin($stateParams.next);

      }).catch(function(resp) {
        $log.warn(resp);
        switch (resp.status) {
          case "ACCOUNT_INACTIVE":
            $state.go('registeredSuccessfully');
            // user should already be redirected
            break;
          case "UNKNOWN_ERROR":
          default:
            vm.loginErrors['wrong-password'] = true;
            vm.password = '';
        }
      });
    }

    function login() {
      vm.loginErrors['username-nonexistant'] = false;
      vm.loginErrors['wrong-password'] = false;
      // TODO ideally it should be done by dedicated directive to handle all outside clicks
      mainVm.menuVisible = false;

      if (Helpers.isEmail(vm.username)) {
        vm.emailOrUsername = 'email';
        // ensure email exists
        UserService.validateUserEmail(vm.username).then(function(data) {
          if (data.valid) {
            // email doesn't exist
            vm.loginErrors['username-nonexistant'] = true;
          } else {
            vm.loginErrors['username-nonexistant'] = false;
            _doLogin(vm.username, vm.currentPassword);
          }
        }).catch(function(resp) {
          // TODO handle error
          // assume email exists, login would in any case if it didn't
          vm.loginErrors['username-nonexistant'] = false;
          _doLogin(vm.username, vm.currentPassword);
        });
      } else {
        vm.emailOrUsername = 'username';
        // username - make sure it exists
        UserService.validateUserHandle(vm.username).then(function(data) {
          if (data.valid) {
            // username doesn't exist
            vm.loginErrors['username-nonexistant'] = true;
          } else {
            vm.loginErrors['username-nonexistant'] = false;
            _doLogin(vm.username, vm.currentPassword);
          }
        }).catch(function(resp) {
          // TODO handle error
          // assume email exists, login would in any case if it didn't
          vm.loginErrors['username-nonexistant'] = false;
          _doLogin(vm.username, vm.currentPassword);
        });
      }
    };

    function socialLogin(backend) {
      var params = {}, callbackUrl;
      if ($stateParams.next) {
        params = {next: $stateParams.next};
      }
      callbackUrl = $state.href('login', params, {absolute: true});
      TcAuthService.socialLogin(backend, callbackUrl)
      .then(function() {
        $log.debug('logged in');
        return Helpers.redirectPostLogin($stateParams.next);
      })
      .catch(function(resp) {
        switch (resp.status) {
          case "ACCOUNT_INACTIVE":
            window.location.href = "https://www." + CONSTANTS.domain + "/account-inactive/";
          case "USER_NOT_REGISTERED":
          default:
            vm.socialLoginError = 401;
            vm.loginErrors['social-login-error'] = true;
            break;
        }
      });
    };
  }

})();
