(function() {
  'use strict';

  angular.module('tc.account').controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', '$stateParams', 'tcAuth', 'authtoken'];

  function LoginController($log, $state, $stateParams, tcAuth, authtoken) {
    var vm = this;
    vm.passwordReset = false;

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

    var redirect = function(force) {
      // check if the user is already logged in
      if (tcAuth.isAuthenticated()) {
        // redirect to next if exists else dashboard
        if ($stateParams.next) {
          $log.debug('Redirecting: ' + $stateParams.next);
          window.location.href = decodeURIComponent($stateParams.next);
        } else {
          // FIXME
          window.location.href = 'https://www.topcoder-dev.com/my-dashboard';
        }
      }
    };

    redirect();

    vm.doLogin = function() {
      // TODO placeholder, validate form etc
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
    };

    vm.socialLogin = function(backend) {
      var state = location.href;
      tcAuth.socialLogin(backend, state);
    }

  }

})();
