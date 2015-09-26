(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('MyDashboardController', MyDashboardController);

  MyDashboardController.$inject = ['userIdentity'];

  function MyDashboardController(userIdentity) {
    var vm = this;

    activate();

    function activate() {
      vm.isCopilot = _.includes(userIdentity.roles, 'copilot');
    }
  }
})();
