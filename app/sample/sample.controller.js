(function() {
  'use strict';

  angular.module('topcoder').controller('SampleController', SampleController);

  SampleController.$inject = ['$log', 'UserService', 'tcAuth'];

  function SampleController($log, UserService, tcAuth) {
    var vm = this;

    vm.loggedIn = tcAuth.isAuthenticated();

    if (vm.loggedIn) {
      UserService.getUsername().then(function(data) {
          vm.user = data;
        },
        function(resp) {
          vm.user = 'error';
        }
      );
    }
  };
})();
