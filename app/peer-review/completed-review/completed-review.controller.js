(function() {
  // The CompletedReview controller displays a completed review.

  'use strict';

  angular.module('tc.peer-review').controller('CompletedReviewController',  CompletedReviewController);

  CompletedReviewController.$inject = ['$stateParams', 'scorecard', 'review', 'user', 'challenge', 'helpers', '$q', 'CONSTANTS'];

  function CompletedReviewController($stateParams, scorecard, review, user, challenge, helpers, $q, CONSTANTS) {
    var vm = this;
    vm.submissionDownloadPath = CONSTANTS.submissionDownloadPath;
    vm.domain = CONSTANTS.domain;
    vm.challengeId = $stateParams.challengeId;
    vm.loaded = false;
    vm.stats = {};
    vm.scorecard = {
      questions: {}
    };
    vm.submit = function() {
      $state.go('review.status', {
        challengeId: vm.challengeId
      });
    };

    activate();

    function activate() {
      var promises = [
        user.getUsername(),
        challenge.getChallengeDetails($stateParams.challengeId),
        review.getReview($stateParams.reviewId),
        scorecard.getScorecard(vm.challengeId)
      ];

      $q.all(promises)
      .then(function(response) {
        var user = response[0].data;
        vm.stats.username = user.handle;

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

        scorecard.getScorecardQuestions(scorecardId)
        .then(function(data) {
          var questions = data.data.result.content;

          helpers.storeById(vm.scorecard.questions, questions);
          helpers.parseQuestions(vm.scorecard.questions);

          return review.getReviewItems($stateParams.reviewId);

        }).then(function(data) {
          var answers = data.data.result.content;

          helpers.parseAnswers(vm.scorecard.questions, answers);

          vm.loaded = true;
        });
      });
    }
  };
})();
