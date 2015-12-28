(function () {
  'use strict';

  angular.module('tc.submissions').controller('SubmissionsController', SubmissionsController);

  SubmissionsController.$inject = ['challengeToSubmitTo'];

  function SubmissionsController(challengeToSubmitTo) {
    var vm = this;
    vm.challengeTitle = challengeToSubmitTo.name;
    vm.challengeId = challengeToSubmitTo.id;
    vm.track = challengeToSubmitTo.track.toLowerCase();

    activate();

    function activate() {}
  }
})();
