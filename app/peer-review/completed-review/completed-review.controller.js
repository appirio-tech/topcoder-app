import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.peer-review').controller('CompletedReviewController',  CompletedReviewController)

  CompletedReviewController.$inject = ['$stateParams', 'ScorecardService', 'ReviewService', 'UserService', 'ChallengeService', 'Helpers', '$q', 'CONSTANTS']

  function CompletedReviewController($stateParams, ScorecardService, ReviewService, UserService, ChallengeService, Helpers, $q, CONSTANTS) {
    var vm = this
    vm.domain = CONSTANTS.domain
    vm.challengeId = $stateParams.challengeId
    vm.loaded = false
    vm.stats = {}
    vm.scorecard = {
      questions: {}
    }
    var handle = UserService.getUserIdentity().handle
    vm.submit = function() {
      $state.go('review.status', {
        challengeId: vm.challengeId
      })
    }

    activate()

    function activate() {
      var promises = [
        handle,
        ChallengeService.getChallengeDetails($stateParams.challengeId),
        ReviewService.getReview($stateParams.reviewId),
        ScorecardService.getScorecard(vm.challengeId)
      ]

      $q.all(promises)
      .then(function(response) {
        vm.stats.username = handle

        var challenge = response[1].data
        vm.challenge = challenge

        var reviewData = response[2].data.result.content
        vm.review = reviewData
        vm.stats.submissionId = reviewData.submissionId
        vm.stats.uploadId = reviewData.uploadId
        vm.stats.createdAt = reviewData.createdAt
        vm.stats.updatedAt = reviewData.updatedAt

        var scorecardData = response[3].data.result.content[0]
        var scorecardId = scorecardData.id

        ScorecardService.getScorecardQuestions(scorecardId)
        .then(function(data) {
          var questions = data.data.result.content

          Helpers.storeById(vm.scorecard.questions, questions)
          Helpers.parseQuestions(vm.scorecard.questions)

          return ReviewService.getReviewItems($stateParams.reviewId)

        }).then(function(data) {
          var answers = data.data.result.content

          Helpers.parseAnswers(vm.scorecard.questions, answers)

          vm.loaded = true
        })
      })
    }
  }
})()
