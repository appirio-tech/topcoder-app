(function () {
  'use strict';

  angular.module('tc.settings').controller('SettingsController', SettingsController);

  SettingsController.$inject = [];

  function SettingsController() {
    var vm = this;
    vm.testSettings = 'settings vm test value';

    activate();

    function activate() {
      console.log('Settings Controller activated.');
    }
  }

})();
