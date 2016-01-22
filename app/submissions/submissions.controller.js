(function () {
  'use strict';

  angular.module('tc.submissions').controller('SubmissionsController', SubmissionsController);

  SubmissionsController.$inject = ['challengeToSubmitTo', '$state'];

  function SubmissionsController(challengeToSubmitTo, $state) {

    var vm = this;

    var challenge = challengeToSubmitTo.challenge;
    vm.challengeTitle = challenge.name;
    vm.challengeId = challenge.id;
    vm.track = challenge.track.toLowerCase();

    activate();

    function activate() {
      var track = challengeToSubmitTo.challenge.track;

      if (track === 'DESIGN') {
        $state.go('submissions.file.design');
      } else if (track === 'DEVELOP') {
        $state.go('submissions.file.develop')
      }
    }
  }
})();
