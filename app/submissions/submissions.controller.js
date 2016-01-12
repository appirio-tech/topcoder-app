(function () {
  'use strict';

  angular.module('tc.submissions').controller('SubmissionsController', SubmissionsController);

  SubmissionsController.$inject = ['challengeToSubmitTo'];

  function SubmissionsController(challengeToSubmitTo) {
    var vm = this;

    var challenge = challengeToSubmitTo.challenge;
    vm.challengeTitle = challenge.name;
    vm.challengeId = challenge.id;
    vm.track = challenge.track.toLowerCase();

    activate();

    function activate() {}
  }
})();
