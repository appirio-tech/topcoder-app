(function() {
  'use strict';

  // The EditReviewController controller fetches the scorecard template and any
  // answers saved but not submitted.
  angular.module('tc.peer-review').controller('EditReviewController', EditReviewController);

  EditReviewController.$inject = ['$state', '$stateParams', 'ReviewService', 'ScorecardService', 'UserService', 'ChallengeService', 'Helpers', '$q', 'CONSTANTS'];

  function EditReviewController($state, $stateParams, ReviewService, ScorecardService, UserService, ChallengeService, Helpers, $q, CONSTANTS) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.challengeId = $stateParams.challengeId;
    vm.challenge = null;
    vm.loaded = false;
    vm.saved = false;
    vm.stats = {};
    vm.scorecard = {
      questions: {}
    };
    var handle = UserService.getUserIdentity().handle;

    vm.submitReviewItems = function() {
      var body = Helpers.compileReviewItems(vm.scorecard.questions, vm.review, vm.saved);

      ReviewService.saveReviewItems(body, vm.saved)
      .then(function(response) {
        return ReviewService.markAsCompleted($stateParams.reviewId);
      })
      .then(function(response) {
        $state.go('review.status', {
          challengeId: vm.challengeId
        });
      })
      .catch(function(error) {
        var message = 'An error occurred while trying to submit answers.\n' + error.status + ': ' + error.statusText;

        alert(message);

        $state.reload();
      });
    };

    vm.saveReviewForLater = function() {
      var body = Helpers.compileReviewItems(vm.scorecard.questions, vm.review, vm.saved);

      ReviewService.saveReviewItems(body, vm.saved)
      .then(function(data) {
        $state.go('review.status', {
          challengeId: vm.challengeId
        });
      })
      .catch(function(error) {
        var message = 'An error occurred while trying to update answers.\n' + error.status + ': ' + error.statusText;

        alert(message);

        $state.reload();
      });
    };

    activate();

    function activate() {
      var promises = [
        handle,
        ChallengeService.getChallengeDetails(vm.challengeId),
        ReviewService.getReview($stateParams.reviewId),
        ScorecardService.getScorecard(vm.challengeId)
      ];

      $q.all(promises)
      .then(function(response) {
        var user = response[0].data;
        vm.stats.username = handle;

        var challenge = response[1].data;
        vm.challenge = challenge;

        var reviewData = response[2].data.result.content;
        vm.review = reviewData;
        vm.stats.submissionId = reviewData.submissionId;
        vm.stats.uploadId = reviewData.uploadId;
        vm.stats.createdAt = reviewData.createdAt;
        vm.stats.updatedAt = reviewData.updatedAt;

        var scorecardData = response[3].data.result.content[0];
        var scorecardId = scorecardData.id;

        ScorecardService.getScorecardQuestions(scorecardId)
        .then(function(data) {
          var questions = data.data.result.content;

          Helpers.storeById(vm.scorecard.questions, questions);
          Helpers.parseQuestions(vm.scorecard.questions);

          return ReviewService.getReviewItems($stateParams.reviewId);

        })
        .then(function(data) {
          var answers = data.data.result.content;

          vm.saved = Helpers.parseAnswers(vm.scorecard.questions, answers);

          vm.loaded = true;
        });
      });
    }
  };
})();
