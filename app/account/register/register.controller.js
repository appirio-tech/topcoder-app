(function() {
  'use strict';

  angular.module('tc.account').controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$log', 'tcAuth'];

  function RegisterController($log, tcAuth) {
    var vm = this;
    vm.usernameTips = false;

    vm.register = function() {
      console.log('Registering');
      tcAuth.login(vm.username, vm.password)
      .then(function(data) {
        $log.debug('registered successfully');
      })
      .catch(function(err) {
      });
    };

  }
})();
