(function () {
  'use strict';

  angular.module('tc.submissions').controller('SubmissionsController', SubmissionsController);

  SubmissionsController.$inject = [];

  function SubmissionsController() {
    var vm = this;

    activate();

    function activate() {
      vm.testValue = 'testValue';
    }
  }
})();
