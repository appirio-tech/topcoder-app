(function () {
  'use strict';

  angular.module('tc.submissions').controller('SubmitFileController', SubmitFileController);

  SubmitFileController.$inject = [];

  function SubmitFileController() {
    var vm = this;

    activate();

    function activate() {
      vm.submitFile = true;
    }
  }
})();
