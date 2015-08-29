(function () {
  'use strict';

  angular.module('tc.settings').controller('AccountInfoController', AccountInfoController);

  AccountInfoController.$inject = ['UserService', '$log'];

  function AccountInfoController(UserService, $log) {
    var vm = this;
    vm.saveAccountInfo = saveAccountInfo;

    activate();

    function activate() {
      var user    = UserService.getUserIdentity();

      vm.username = user.handle;
      vm.email    = user.email;
    }

    function saveAccountInfo() {

    }
  }
})();
