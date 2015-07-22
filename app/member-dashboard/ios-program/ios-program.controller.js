(function() {
  'use strict';

  angular.module('tc.myDashboard').controller('iOSProgramController', iOSProgramController);

  iOSProgramController.$inject = ['UserService'];

  function iOSProgramController (UserService) {
    var vm = this;
    vm.test = 'test';
  }
})();
