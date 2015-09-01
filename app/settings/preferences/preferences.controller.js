(function () {
  'use strict';

  angular.module('tc.settings').controller('PreferencesController', PreferencesController);

  PreferencesController.$inject = ['UserService', '$log'];

  function PreferencesController(UserService, $log) {
    var vm = this;

    activate();

    function activate() {

    }
  }
})();
