(function() {
  // The CompletedReview controller displays a completed review.

  'use strict';

  angular.module('tc.peer-review').controller('CompletedReviewController',  CompletedReviewController);

  CompletedReviewController.$inject = ['$scope', '$stateParams', 'scorecard', 'review', 'user', 'challenge', 'helpers', '$q', 'CONSTANTS'];

  function CompletedReviewController($scope, $stateParams, scorecard, review, user, challenge, helpers, $q, CONSTANTS) {
    $scope.submissionDownloadPath = CONSTANTS.submissionDownloadPath;
    $scope.domain = CONSTANTS.domain;
    $scope.challengeId = $stateParams.challengeId;
    $scope.loaded = false;
    $scope.stats = {};
    $scope.scorecard = {
      questions: {}
    };
    $scope.submit = function() {
      $state.go('review.status', {
        challengeId: $scope.challengeId
      });
    };

    var promises = [
      user.getUsername(),
      challenge.getChallengeDetails($stateParams.challengeId),
      review.getReview($stateParams.reviewId),
      scorecard.getScorecard($scope.challengeId)
    ];

    $q.all(promises)
    .then(function(response) {
      var user = response[0].data;
      $scope.stats.username = user.handle;

      var challenge = response[1].data;
      $scope.challenge = challenge;

      var reviewData = response[2].data.result.content;
      $scope.review = reviewData;
      $scope.stats.submissionId = reviewData.submissionId;
      $scope.stats.uploadId = reviewData.uploadId;
      $scope.stats.createdAt = reviewData.createdAt;
      $scope.stats.updatedAt = reviewData.updatedAt;

      var scorecardData = response[3].data.result.content[0];
      var scorecardId = scorecardData.id;

      scorecard.getScorecardQuestions(scorecardId)
      .then(function(data) {
        var questions = data.data.result.content;

        helpers.storeById($scope.scorecard.questions, questions);
        helpers.parseQuestions($scope.scorecard.questions);

        return review.getReviewItems($stateParams.reviewId);

      }).then(function(data) {
        var answers = data.data.result.content;

        helpers.parseAnswers($scope.scorecard.questions, answers);

        $scope.loaded = true;
      });
    });
  };
})();
