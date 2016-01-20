(function () {
  'use strict';

  angular.module('tc.submissions').controller('SubmitFileCompletedController', SubmitFileCompletedController);

  SubmitFileCompletedController.$inject = ['$log', 'challengeToSubmitTo'];

  function SubmitFileCompletedController($log, challengeToSubmitTo) {
    $log = $log.getInstance('SubmitFileCompletedController');
    var vm = this;
    vm.test = 'hi'

    activate();

    function activate() {
      console.log('ACTIVATED')
    }
  }
})();
