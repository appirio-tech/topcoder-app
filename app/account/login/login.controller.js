(function() {
  'use strict';

  angular.module('tc.account').controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', '$stateParams', 'tcAuth', 'authtoken', 'UserService'];

  function LoginController($log, $state, $stateParams, tcAuth, authtoken, UserService) {
    var vm = this;
    vm.passwordReset = false;
    vm.usernameExists = true;

    var redirect = function() {
      // check if the user is already logged in
      if (tcAuth.isAuthenticated()) {
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
      authtoken.setV3Token($stateParams.userJWTToken);
      redirect();
    }
    if ($stateParams.status) {
      // handle social login callback
      var status = parseInt($stateParams.status);
      switch(status) {
        case 200:
          authtoken.getTokenFromAuth0Code($stateParams.code);
          break;
        case 401:
        default:
          vm.socialLoginError = status;
          break;
      }
    } else if ($stateParams.code && $stateParams.state) {
      authtoken.getTokenFromAuth0Code($stateParams.code).then(
        function(v3Token) {
          $log.debug('looged in using social');
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
        tcAuth.login(vm.username, vm.password).then(
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
      tcAuth.socialLogin(backend, callbackUrl);
    };

  }

})();
