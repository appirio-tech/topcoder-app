(function() {
  'use strict';

  angular.module('topcoder').controller('SampleController', SampleController);

  SampleController.$inject = ['$log', 'userService', 'tcAuth'];

  function SampleController($log, userService, tcAuth) {
    var vm = this;

    vm.loggedIn = tcAuth.isAuthenticated();

    if (vm.loggedIn) {
      userService.getUsername().then(function(data) {
          vm.user = data;
        },
        function(resp) {
          vm.user = 'error';
        }
      );
    }
  };
})();
