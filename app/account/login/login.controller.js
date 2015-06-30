(function() {
  'use strict';

  angular.module('tc.account').controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', '$stateParams', 'auth', '$location'];

  function LoginController($log, $state, $stateParams, auth, $location) {
    var vm = this;
    vm.name = 'login';

    // check if the user is already logged in
    if (auth.isAuthenticated()) {
      // redirect to next if exists else dashboard
      if ($stateParams.next) {
        $log.debug('Redirecting: ' + $stateParams.next);
        $log.debug($location.path());
        $location.path($stateParams.next);
      } else {
        // FIXME
        $state.go('sample.child1');
      }
    }

  }
})();
