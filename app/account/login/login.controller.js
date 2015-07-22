(function() {
  'use strict';

  angular.module('tc.account').controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', '$stateParams', 'TcAuthService', 'AuthTokenService', 'UserService'];

  function LoginController($log, $state, $stateParams, TcAuthService, AuthTokenService, UserService) {
    var vm = this;
    vm.passwordReset = false;
    vm.usernameExists = true;

    var redirect = function() {
      // check if the user is already logged in
      if (TcAuthService.isAuthenticated()) {
        // redirect to next if exists else dashboard
        if ($stateParams.next) {
          $log.debug('Redirecting: ' + $stateParams.next);
          window.location.href = decodeURIComponent($stateParams.next);
        } else {
          $state.go('dashboard');
        }
      }
    };

    // Handling social login stuff
    if ($stateParams.userJWTToken) {
      // user logged in
      AuthTokenService.setV3Token($stateParams.userJWTToken);
      redirect();
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
          redirect();
        }
      );
    }

    vm.login = function() {
      UserService.validateUserHandle(vm.username)
      .then(function() {
        // User does not exist
        vm.usernameExists = false;
      })
      .catch(function() {
        // User exists
        vm.usernameExists = true;
        TcAuthService.login(vm.username, vm.password).then(
          function(data) {
            // success
            $log.debug('logged in');
            redirect(true);
          },
          function(err) {
            // handle error
            vm.wrongPassword = true;
            vm.password = '';
          }
        );
      });


    };

    vm.socialLogin = function(backend) {
      var params = {}, callbackUrl;
      if ($stateParams.next) {
        params = {next: $stateParams.next};
      }
      callbackUrl = $state.href('login', params, {absolute: true});
      TcAuthService.socialLogin(backend, callbackUrl);
    };

  }

})();
