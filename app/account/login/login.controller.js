(function() {
  'use strict';

  angular.module('tc.account').controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', '$stateParams', '$location', '$scope', 'TcAuthService', 'UserService', 'NotificationService', 'Helpers', 'CONSTANTS'];

  function LoginController($log, $state, $stateParams, $location, $scope, TcAuthService, UserService, NotificationService, Helpers, CONSTANTS) {
    var vm = this;
    $log = $log.getInstance("LoginController");
    vm.$stateParams = $stateParams;
    vm.passwordReset = false;
    vm.loginErrors = {
      USERNAME_NONEXISTANT: false,
      WRONG_PASSWORD: false,
      SOCIAL_LOGIN_ERROR: false
    };

    vm.login = login;
    vm.socialLogin = socialLogin;

    // reference for main vm
    var mainVm = $scope.$parent.main;

    activate();

    function activate() {
      if ($stateParams.notifyReset) {
        NotificationService.inform('Your new password has been set. Please log in. If you have any trouble, please contact support@topcoder.com.');
      }
    }

    function login() {
      vm.loginErrors.USERNAME_NONEXISTANT = false;
      vm.loginErrors.WRONG_PASSWORD = false;

      // TODO ideally it should be done by dedicated directive to handle all outside clicks
      mainVm.menuVisible = false;

      if (Helpers.isEmail(vm.username)) {
        // the user is loggin in using email
        vm.emailOrUsername = 'email';

        // ensure email exists
        // uses same validity check as registration
        // valid => email isn't already used by someone
        UserService.validateUserEmail(vm.username).then(function(data) {
          if (data.valid) {
            // email doesn't exist
            vm.loginErrors.USERNAME_NONEXISTANT = true;
          } else {
            _doLogin(vm.username, vm.currentPassword);
          }
        }).catch(function(resp) {
          // TODO handle error
          // assume email exists, login would in any case if it didn't
          vm.loginErrors.USERNAME_NONEXISTANT = false;
          _doLogin(vm.username, vm.currentPassword);
        });
      } else {
        // the user is logging in using a username
        vm.emailOrUsername = 'username';

        // username - make sure it exists
        UserService.validateUserHandle(vm.username).then(function(data) {
          if (data.valid) {
            // username doesn't exist
            vm.loginErrors.USERNAME_NONEXISTANT = true;
          } else {
            _doLogin(vm.username, vm.currentPassword);
          }
        }).catch(function(resp) {
          // TODO handle error
          // assume email exists, login would in any case if it didn't
          _doLogin(vm.username, vm.currentPassword);
        });
      }
    };

    function _doLogin(usernameOrEmail, password) {
      return TcAuthService.login(usernameOrEmail, password).then(function(data) {
        // success
        $log.debug('logged in');

        // setup login event for analytics tracking
        Helpers.setupLoginEventMetrics(usernameOrEmail);
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
            vm.loginErrors.WRONG_PASSWORD = true;
            vm.password = '';
        }
      });
    }

    function socialLogin(platform) {
      // we need to pass on the 'next' param if we have one
      var params = {};
      if ($stateParams.next) {
        params = {next: $stateParams.next};
      }

      // redirect back to login
      var callbackUrl = $state.href('login', params, {absolute: true});

      TcAuthService.socialLogin(platform, callbackUrl)
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
            vm.loginErrors.SOCIAL_LOGIN_ERROR = true;
            break;
        }
      });
    };
  }

})();
