import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.submissions').controller('SubmissionsController', SubmissionsController)

  SubmissionsController.$inject = ['challengeToSubmitTo', '$state', 'logger']

  function SubmissionsController(challengeToSubmitTo, $state, logger) {
    var vm = this

    vm.error = !!challengeToSubmitTo.error
    // test to see if sentry logging works
    try {
      var a = null
      a[1].undef
    } catch (e) {
      if (window.Raven) {
        window.Raven.captureException(e)
        logger.debug(window.Raven.lastEventId())
      }
    }
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
