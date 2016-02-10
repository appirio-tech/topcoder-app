import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.peer-review').controller('ReviewStatusController', ReviewStatusController)

  ReviewStatusController.$inject = ['$state', '$stateParams', 'ReviewService', 'ChallengeService', 'Helpers', 'CONSTANTS']

  function ReviewStatusController($state, $stateParams, ReviewService, ChallengeService, Helpers, CONSTANTS) {
    var vm = this
    vm.domain = CONSTANTS.domain
    vm.loaded = false
    vm.challengeId = $stateParams.challengeId
    vm.challenge = null

    vm.getNextReview = function() {
      if (vm.reviews.length >= 5) {
        alert('You may only complete 5 reviews.')
        return
      }
      ReviewService.getNextReview(vm.challengeId)
      .then(function(data) {
        var newReviewId = data

        $state.go('review.edit', {
          challengeId: vm.challengeId,
          reviewId: newReviewId
        })
      })
      .catch(function(error) {
        // An error occurred while trying to get the next review
        $state.reload()
      })
    }

    activate()

    function activate() {
      ChallengeService.getChallengeDetails(vm.challengeId)
      .then(function(data) {
        vm.challenge = data
      })

      ReviewService.getUsersPeerReviews(vm.challengeId)
      .then(function(data) {
        vm.reviews = data.plain()
        vm.completed = Helpers.countCompleted(vm.reviews)
        // Move calls to $q.all(), and move this to the success callback there
        vm.loaded = true
      })

      ChallengeService.getPhase(vm.challengeId, 'REVIEW').then(function(data) {
        vm.reviewsDue = data.scheduledEndTime
      })
    }
  }
})()
