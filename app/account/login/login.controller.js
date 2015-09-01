(function() {
  'use strict';

  angular.module('tc.account').controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', '$stateParams', 'TcAuthService', 'AuthTokenService', 'UserService', 'NotificationService', 'Helpers'];

  function LoginController($log, $state, $stateParams, TcAuthService, AuthTokenService, UserService, NotificationService, Helpers) {
    var vm = this;
    vm.passwordReset = false;
    vm.usernameExists = true;

    // Handling social login stuff
    if ($stateParams.userJWTToken) {
      // user logged in
      AuthTokenService.setV3Token($stateParams.userJWTToken);
      Helpers.redirectPostLogin($stateParams.next);
    }

    if ($stateParams.status) {
      // handle social login callback
      var status = parseInt($stateParams.status);
      switch(status) {
        case 200:
          AuthTokenService.getTokenFromAuth0Code($stateParams.code);
          break;
        case 401:
        default:
          vm.socialLoginError = status;
          break;
      }
    } else if ($stateParams.code && $stateParams.state) {
      AuthTokenService.getTokenFromAuth0Code($stateParams.code).then(
        function(v3Token) {
          $log.debug('logged in using social');
          return Helpers.redirectPostLogin($stateParams.next);
        }
      );
    }

    if ($stateParams.notifyReset) {
      NotificationService.inform('Your new password has been set. Please log in. If you have any trouble, please contact support@topcoder.com.');
    }

    function _doLogin(usernameOrEmail, password) {
     return TcAuthService.login(usernameOrEmail, password).then(
      function(data) {
        // success
        $log.debug('logged in');
        return Helpers.redirectPostLogin($stateParams.next);
      },
      function(err) {
        // handle error
        vm.wrongPassword = true;
        vm.password = '';
      });
    }

    vm.login = function() {
      if (Helpers.isEmail(vm.username)) {
        // ensure email exists
        UserService.validateUserEmail(vm.username).then(function(data) {
          if (data.valid) {
            // email doesn't exist
            vm.usernameExists = false;
          } else {
            vm.usernameExists = true;
            _doLogin(vm.username, vm.password);
          }
        }).catch(function(resp) {
          // TODO handle error
          // assume email exists, login would in any case if it didn't
          vm.usernameExists = true;
          _doLogin(vm.username, vm.password);
        });
      } else {
        // username - make sure it exists
        UserService.validateUserHandle(vm.username).then(function(data) {
          if (data.valid) {
            // email doesn't exist
            vm.usernameExists = false;
          } else {
            vm.usernameExists = true;
            _doLogin(vm.username, vm.password);
          }
        }).catch(function(resp) {
          // TODO handle error
          // assume email exists, login would in any case if it didn't
          vm.usernameExists = true;
          _doLogin(vm.username, vm.password);
        });
      }
    };

    vm.socialLogin = function(backend) {
      var params = {}, callbackUrl;
      if ($stateParams.next) {
        params = {next: $stateParams.next};
      }
      callbackUrl = $state.href('login', params, {absolute: true});
      TcAuthService.socialLogin(backend, callbackUrl);
    };

    vm.goToRegister = function() {
      var params = {};
      if ($stateParams.next) {
        params = {next: $stateParams.next};
      }
      $state.go('register', params);
    }
  }

})();
