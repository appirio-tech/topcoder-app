(function() {
  'use strict';

  angular.module('tc.account').controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', '$stateParams', 'tcAuth', '$location', 'authtoken'];

  function LoginController($log, $state, $stateParams, tcAuth, $location, authtoken) {
    var vm = this;
    vm.passwordReset = false;

    if ($stateParams.state && $stateParams.code) {
      authtoken.getTokenFromAuth0Code($stateParams.code);
    }

    var redirect = function() {
      // check if the user is already logged in
      if (tcAuth.isAuthenticated()) {
        // redirect to next if exists else dashboard
        if ($stateParams.next) {
          $log.debug('Redirecting: ' + $stateParams.next);
          $location.path(decodeURIComponent($stateParams.next));
        } else {
          // FIXME
          $state.go('sample.child1');
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
          redirect();
        },
        function(err) {
          // handle error
          $log.error("You messed up son! " + err);
          // Set validity of password to false if authentication failed
        }
      );
    };

    vm.socialLogin = function(backend) {
      tcAuth.socialLogin(backend);
    }

  }

})();
