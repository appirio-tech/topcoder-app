import angular from 'angular'

(function() {
  'use strict'

  // The EditReviewController controller fetches the scorecard template and any
  // answers saved but not submitted.
  angular.module('tc.peer-review').controller('EditReviewController', EditReviewController)

  EditReviewController.$inject = ['$state', '$stateParams', 'ReviewService', 'ScorecardService', 'UserService', 'ChallengeService', 'Helpers', '$q', 'CONSTANTS', '$log', 'logger']

  function EditReviewController($state, $stateParams, ReviewService, ScorecardService, UserService, ChallengeService, Helpers, $q, CONSTANTS, $log, logger) {
    var vm = this
    vm.domain = CONSTANTS.domain
    vm.challengeId = $stateParams.challengeId
    vm.challenge = null
    vm.loaded = false
    vm.saved = false
    vm.stats = {}
    vm.scorecard = {
      questions: {}
    }
    var handle = UserService.getUserIdentity().handle

    vm.submitReviewItems = function() {
      var body = Helpers.compileReviewItems(vm.scorecard.questions, vm.review, vm.saved)

      ReviewService.saveReviewItems(body, vm.saved)
      .then(function(response) {
        return ReviewService.markAsCompleted($stateParams.reviewId)
      })
      .then(function(response) {
        $state.go('review.status', {
          challengeId: vm.challengeId
        })
      })
      .catch(function(err) {
        logger.error('Could not submit review data', err)

        var message = 'An error occurred while trying to submit answers.\n' + err.status + ': ' + err.statusText

        alert(message)

        $state.reload()
      })
    }

    vm.saveReviewForLater = function() {
      var body = Helpers.compileReviewItems(vm.scorecard.questions, vm.review, vm.saved)

      ReviewService.saveReviewItems(body, vm.saved)
      .then(function(data) {
        $state.go('review.status', {
          challengeId: vm.challengeId
        })
      })
      .catch(function(err) {
        logger.error('Could not save review data for later', err)

        var message = 'An error occurred while trying to update answers.\n' + err.status + ': ' + err.statusText

        alert(message)

        $state.reload()
      })
    }

    activate()

    function activate() {
      var promises = [
        ChallengeService.getChallengeDetails(vm.challengeId),
        ReviewService.getReview($stateParams.reviewId),
        ScorecardService.getScorecard(vm.challengeId)
      ]

      $q.all(promises)
      .then(function(responses) {
        vm.stats.username = handle

        vm.challenge = responses[0]

        vm.review = responses[1]
        vm.stats.submissionId = vm.review.submissionId
        vm.stats.uploadId = vm.review.uploadId
        vm.stats.createdAt = vm.review.createdAt
        vm.stats.updatedAt = vm.review.updatedAt

        var scorecardData = responses[2][0]
        var scorecardId = scorecardData.id

        ScorecardService.getScorecardQuestions(scorecardId)
        .then(function(questions) {

          Helpers.storeById(vm.scorecard.questions, questions)
          Helpers.parseQuestions(vm.scorecard.questions)

          return ReviewService.getReviewItems($stateParams.reviewId)

        })
        .then(function(answers) {
          vm.saved = Helpers.parseAnswers(vm.scorecard.questions, answers)

          vm.loaded = true
        })
      })
    }
  }
})()
