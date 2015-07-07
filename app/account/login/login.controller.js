(function() {
  'use strict';

  angular.module('tc.account').controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', '$stateParams', 'auth', '$location'];

  function LoginController($log, $state, $stateParams, auth, $location) {
    var vm = this;
    vm.passwordReset = false;
    vm.userDoesntExist = false;
    vm.wrongPassword = false;


    var redirect = function() {
      // check if the user is already logged in
      if (auth.isAuthenticated()) {
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
      if (vm.loginForm.$valid) {

        auth.login(vm.username, vm.password).then(
          function(data) {
            // success
            $log.debug('logged in');
            redirect();
          },
          function(err) {
            // handle error
            $log.error("You messed up son! " + err);
          });
      } else {
        // do something
      }
    };

  }

})();
