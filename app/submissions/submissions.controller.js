(function () {
  'use strict'

  angular.module('tc.submissions').controller('SubmissionsController', SubmissionsController)

  SubmissionsController.$inject = ['challengeToSubmitTo', '$state']

  function SubmissionsController(challengeToSubmitTo, $state) {
    var vm = this

    vm.error = !!challengeToSubmitTo.error

    if (vm.error) {
      vm.errorType = challengeToSubmitTo.error.type
      vm.errorMessage = challengeToSubmitTo.error.message
      vm.challengeError = vm.errorType === 'challenge'
    }

    if (challengeToSubmitTo.challenge) {
      var challenge = challengeToSubmitTo.challenge
      vm.challengeTitle = challenge.name
      vm.challengeId = challenge.id
      vm.track = challenge.track.toLowerCase()

      if (challenge.track === 'DESIGN') {
        $state.go('submissions.file-design')
      } else if (challenge.track === 'DEVELOP') {
        $state.go('submissions.file-develop')
      }
    }
  }
})()
