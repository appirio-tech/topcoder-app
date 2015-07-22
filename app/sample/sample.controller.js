(function() {
  'use strict';

  angular.module('topcoder').controller('SampleController', SampleController);

  SampleController.$inject = ['$log', 'UserService', 'TcAuthService'];

  function SampleController($log, UserService, TcAuthService) {
    var vm = this;

    vm.loggedIn = TcAuthService.isAuthenticated();

    if (vm.loggedIn) {
      vm.user = UserService.getUserIdentity();
    }
  };
})();
