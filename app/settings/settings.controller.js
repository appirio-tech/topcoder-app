(function () {
  'use strict';

  angular.module('tc.settings').controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$state'];

  function SettingsController($state) {
    var vm = this;

    activate();

    function activate() {
      if ($state.$current.name === 'settings') {
        $state.go('settings.profile');
      }
    }
  }

})();
