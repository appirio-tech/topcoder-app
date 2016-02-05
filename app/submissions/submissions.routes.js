import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tc.submissions').config([
    '$stateProvider',
    routes
  ])

  function routes($stateProvider) {
    var states = {
      submissions: {
        parent: 'root',
        abstract: true,
        url: '/challenges/:challengeId/submit/',
        template: require('./submissions')(),
        controller: 'SubmissionsController',
        controllerAs: 'submissions',
        data: {
          authRequired: true,
          title: 'Challenge Submission'
        },
        resolve: {
          challengeToSubmitTo: ['ChallengeService', '$stateParams', 'UserService', ChallengeToSubmitTo]
        }
      },
      'submissions.file-design': {
        url: 'file/',
        template: require('./submit-design-files/submit-design-files')(),
        controller: 'SubmitDesignFilesController',
        controllerAs: 'vm'
      },
      'submissions.file-develop': {
        url: 'file/',
        template: require('./submit-develop-files/submit-develop-files')(),
        controller: 'SubmitDevelopFilesController',
        controllerAs: 'vm'
      }
    }

    function ChallengeToSubmitTo(ChallengeService, $stateParams, UserService) {
      // This page is only available to users that are registered to the challenge (submitter role) and the challenge is in the Checkpoint Submission or Submission phase.
      var params = {
        filter: 'id=' + $stateParams.challengeId
      }

      var userHandle = UserService.getUserIdentity().handle

      var error = null

      return ChallengeService.getUserChallenges(userHandle, params)
        .then(function(challenge) {
          if (!challenge[0]) {
            setErrorMessage('challenge', 'You are either not registered for this challenge, or it is not a valid challenge. Please use your browser\'s back button to return.')
            return {
              error: error,
              challenge: null
            }
          }

          challenge = challenge[0].plain()

          var phaseType
          var phaseId

          var isPhaseSubmission = _.some(challenge.currentPhases, function(phase) {
            if (phase.phaseStatus === 'Open') {
              if (phase.phaseType === 'Submission') {
                phaseType = 'SUBMISSION'
                phaseId = phase.id
                return true

              } else if (phase.phaseType === 'Checkpoint Submission') {
                phaseType = 'CHECKPOINT_SUBMISSION'
                phaseId = phase.id
                return true
              }
            }

            return false
          })

          if (!isPhaseSubmission) {
            setErrorMessage('phase', 'Submission phases are not currently open for this challenge.')
          }

          var isSubmitter = _.some(challenge.userDetails.roles, function(role) {
            return role === 'Submitter'
          })

          if (!isSubmitter) {
            setErrorMessage('submitter', 'You do not have a submitter role for this challenge.')
          }

          return {
            error: error,
            challenge: challenge,
            phaseType: phaseType,
            phaseId: phaseId
          }
        })
        .catch(function(err) {
          setErrorMessage('challenge', 'There was an error getting information for this challenge.')

          return {
            error: error,
            challenge: null
          }
        })

      function setErrorMessage(type, message) {
        // Sets the error as the first error encountered
        if (!error) {
          error = {
            type: type,
            message: message
          }
        }
      }
    }

    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
