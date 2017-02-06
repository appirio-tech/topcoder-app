import angular from 'angular'
import _ from 'lodash'
import moment from 'moment'

(function() {
  'use strict'

  angular.module('tc.services').factory('ChallengeService', ChallengeService)

  ChallengeService.$inject = ['CONSTANTS', 'ApiService', '$q', 'logger']

  function ChallengeService(CONSTANTS, ApiService, $q, logger) {
    var api = ApiService.restangularV3
    var apiV2 = ApiService.restangularV2
    var service = {
      getChallenges: getChallenges,
      getUserChallenges: getUserChallenges,
      getUserMarathonMatches: getUserMarathonMatches,
      getPhase: getPhase,
      getChallengeDetails: getChallengeDetails,
      processActiveDevDesignChallenges: processActiveDevDesignChallenges,
      processActiveMarathonMatches: processActiveMarathonMatches,
      processPastMarathonMatch: processPastMarathonMatch,
      processPastSRM: processPastSRM,
      processPastChallenges: processPastChallenges,
      checkChallengeParticipation: checkChallengeParticipation
    }

    return service

    function getChallenges(params) {
      return api.all('challenges').getList(params)
    }

    function getUserChallenges(handle, params) {
      return api.one('members', handle.toLowerCase()).all('challenges').getList(params)
    }

    function getUserMarathonMatches(handle, params) {
      return api.one('members', handle.toLowerCase()).all('mms').getList(params)
    }

    function getPhase(challengeId, phaseType) {
      return api.one('challenges', challengeId).getList('phases').then(
        function(phases) {
          return _.find(phases, function(p) { return p.phaseType.toUpperCase() === phaseType})
        },
        function(err) {
          logger.error('Could not get challenge phases', err)
        }
      )
    }

    function getChallengeDetails(challengeId) {
      // var url = CONSTANTS.API_URL_V2 + '/challenges/' + challengeId
      // return ApiService.requestHandler('GET', url, {}, true)
      return apiV2.one('challenges', challengeId).get().then(
        function(data) { return data.plain() }
      )
    }

    function processActiveDevDesignChallenges(challenges) {
      angular.forEach(challenges, function(challenge) {
        var phases = challenge.currentPhases
        var hasCurrentPhase = false
        // If currentPhase is null, the challenge is stalled and there is no end time
        challenge.userCurrentPhase = 'Stalled'
        challenge.userCurrentPhaseEndTime = null
        challenge.userAction = null

        if (phases && phases.length) {
          hasCurrentPhase = true
          challenge.userCurrentPhase = phases[0].phaseType
          challenge.userCurrentPhaseEndTime = phases[0].scheduledEndTime
        }

        if (hasCurrentPhase && phases.length > 1) {
          angular.forEach(challenge.currentPhases, function(phase, index, phases) {
            if (phase.phaseType === 'Submission') {
              challenge.userAction = 'Submit'

              if (_.get(challenge, 'userDetails.hasUserSubmittedForReview', false)) {
                challenge.userCurrentPhase = phase.phaseType
                challenge.userCurrentPhaseEndTime = phase.scheduledEndTime
                challenge.userAction = 'Submitted'

                if (phases[index + 1]) {
                  challenge.userCurrentPhase = phases[index + 1].phaseType
                  challenge.userCurrentPhaseEndTime = phases[index + 1].scheduledEndTime
                  challenge.userAction = null
                }
              }

              // if user has role of observer
              var roles = _.get(challenge, 'userDetails.roles', [])
              if (roles && roles.length > 0) {
                var submitterRole = _.findIndex(roles, function(role) {
                  var lRole = role.toLowerCase()
                  return lRole === 'submitter'
                })
                if (submitterRole === -1) {
                  challenge.userAction = null
                }
              }
            }
          })
        }

        if (challenge.userCurrentPhaseEndTime) {
          var fullTime = challenge.userCurrentPhaseEndTime
          var timeAndUnit = moment(fullTime).fromNow(true)
          // Split into components: ['an', 'hour'] || ['2', 'months']
          timeAndUnit = timeAndUnit.split(' ')

          if (timeAndUnit[0] === 'a' || timeAndUnit[0] === 'an') {
            timeAndUnit[0] = '1'
          }

          // Add actual time ['2', 'months', actual date]
          timeAndUnit.push(fullTime)
          challenge.userCurrentPhaseEndTime = timeAndUnit
          challenge.isLate = moment().diff(fullTime) > 0 // If > 0 then the challenge has 'Late Deliverables' or
        }
      })
    }

    function processActiveMarathonMatches(marathonMatches) {
      angular.forEach(marathonMatches, function(match) {
        var rounds = match.rounds

        match.userCurrentPhase = 'Stalled'
        match.userCurrentPhaseEndTime = null
        match.userAction = null

        if (rounds && rounds.length) {
          match.userCurrentPhase = 'Registration'
          match.userCurrentPhaseEndTime = rounds[0].registrationEndAt
          match.userAction = 'Registered'

          if (moment().isAfter(rounds[0].codingStartAt)) {
            match.userCurrentPhase = 'Coding'
            match.userCurrentPhaseEndTime = rounds[0].codingEndAt
            match.userAction = 'Submit'
          }

          if (moment().isAfter(rounds[0].systemTestStartAt)) {
            match.userCurrentPhase = 'System Test Phase'
            match.userCurrentPhaseEndTime = rounds[0].systemTestEndAt
            match.userAction = null
          }
        }

        if (match.userCurrentPhaseEndTime) {
          var fullTime = match.userCurrentPhaseEndTime
          var timeAndUnit = moment(fullTime).fromNow(true)
          // Split into components: ['an', 'hour'] || ['2', 'months']
          timeAndUnit = timeAndUnit.split(' ')

          if (timeAndUnit[0] === 'a' || timeAndUnit[0] === 'an') {
            timeAndUnit[0] = '1'
          }

          // Add actual time ['2', 'months', actual date]
          timeAndUnit.push(fullTime)
          match.userCurrentPhaseEndTime = timeAndUnit
        }
      })
    }

    function processPastMarathonMatch(challenge) {
      challenge.status = challenge.status.trim()
      if (Array.isArray(challenge.rounds) && challenge.rounds.length
        && challenge.rounds[0].userMMDetails && challenge.rounds[0].userMMDetails.rated) {
        challenge.submissionEndDate = challenge.rounds[0].systemTestEndAt
        challenge.newRating = challenge.rounds[0].userMMDetails.newRating
        challenge.pointTotal = challenge.rounds[0].userMMDetails.pointTotal
      }
    }

    function processPastSRM(challenge) {
      if (Array.isArray(challenge.rounds) && challenge.rounds.length
        && challenge.rounds[0].userSRMDetails) {
        challenge.newRating = challenge.rounds[0].userSRMDetails.newRating
        challenge.finalPoints = challenge.rounds[0].userSRMDetails.finalPoints
      }
    }

    function processPastChallenges(challenges) {
      angular.forEach(challenges, function(challenge) {
        if (challenge.userDetails) {
          // TODO placement logic for challenges can be moved to their corresponding user place directive
          // process placement for challenges having winningPlacements array in response
          if (Array.isArray(challenge.userDetails.winningPlacements)) {
            challenge.highestPlacement = _.min(challenge.userDetails.winningPlacements, 'placed').placed
          }
          // process placement for design challenges
          if (challenge.track == 'DESIGN' && challenge.userDetails.submissions && challenge.userDetails.submissions.length > 0) {
            challenge.thumbnailId = challenge.userDetails.submissions[0].id
          }
          // determines the user status for passing the review for one of the submissions
          if (challenge.userDetails.submissions && challenge.userDetails.submissions.length > 0) {
            challenge.passedReview = challenge.userDetails.submissions.filter(function(submission) {
              return submission.type === CONSTANTS.SUBMISSION_TYPE_CONTEST
              && (submission.status === CONSTANTS.STATUS_ACTIVE
                || submission.status === CONSTANTS.STATUS_COMPLETED_WITHOUT_WIN)
            }).length > 0
          }
          if (challenge.highestPlacement === 0) {
            challenge.highestPlacement = null
          }
          challenge.wonFirst = challenge.highestPlacement == 1

          challenge.userHasSubmitterRole = false

          // determines if user has submitter role or not
          var roles = challenge.userDetails.roles
          if (roles.length > 0) {
            var submitterRole = _.findIndex(roles, function(role) {
              var lRole = role.toLowerCase()
              return lRole === 'submitter'
            })
            if (submitterRole >= 0) {
              challenge.userHasSubmitterRole = true
            }
          }

          if (challenge.userDetails.hasUserSubmittedForReview) {
            if (!challenge.passedReview) {
              challenge.userStatus = 'PASSED_SCREENING'
            } else {
              challenge.userStatus = 'PASSED_REVIEW'
            }
          } else {
            challenge.userStatus = 'NOT_FINISHED'
          }

          // if user does not has submitter role, just show Completed
          if (!challenge.userHasSubmitterRole) {
            challenge.userStatus = 'COMPLETED'
          }
        }
      })
    }

    function checkChallengeParticipation(handle, callback) {
      var params = {
        limit: 1,
        offset: 0
      }
      return $q.all([
        getUserMarathonMatches(handle, params),
        getUserChallenges(handle, params)
      ]).then(function(data) {
        var mms = data[0]
        var challenges = data[1]
        if (challenges.metadata.totalCount > 0 || mms.metadata.totalCount > 0) {
          callback(true)
        } else {
          callback(false)
        }
      })
    }
  }
})()
