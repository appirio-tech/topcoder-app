(function () {
  'use strict';

  angular.module('tc.settings').controller('AccountInfoController', AccountInfoController);

  AccountInfoController.$inject = [];

  function AccountInfoController() {
    var vm = this;
    vm.defaultPlaceholder = 'Enter New Password';

    activate();

    function activate() {
      console.log('Account Info Controller activated.');
    }

  }
})();
