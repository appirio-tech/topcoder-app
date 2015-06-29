(function() {
  // The CompletedReview controller displays a completed review.

  'use strict';

  angular.module('tc.peer-review').controller('CompletedReviewController',  CompletedReviewController);

  CompletedReviewController.$inject = ['$scope', '$stateParams', 'scorecard', 'review', 'user', 'challenge', 'helpers', '$q', 'CONSTANTS'];

  function CompletedReviewController($scope, $stateParams, scorecard, review, user, challenge, helpers, $q, CONSTANTS) {
    var promises;
    $scope.submissionDownloadPath = CONSTANTS.submissionDownloadPath;
    $scope.domain = CONSTANTS.domain;
    $scope.challengeId = $stateParams.challengeId;
    $scope.loaded = false;
    $scope.stats = {};
    $scope.scorecard = {
      questions: {}
    };
    promises = [user.getUsername(), challenge.getChallengeDetails($stateParams.challengeId), review.getReview($stateParams.reviewId), scorecard.getScorecard($scope.challengeId)];
    $q.all(promises).then(function(response) {
      var challenge, review, scorecard, scorecardId, user;
      user = response[0].data;
      challenge = response[1].data;
      review = response[2].data.result.content;
      scorecard = response[3].data.result.content[0];
      $scope.stats.username = user.handle;
      $scope.challenge = challenge;
      $scope.stats.submissionId = review.submissionId;
      $scope.stats.uploadId = review.uploadId;
      $scope.stats.createdAt = review.createdAt;
      $scope.stats.updatedAt = review.updatedAt;
      $scope.review = review;
      scorecardId = scorecard.id;
      return scorecard.getScorecardQuestions(scorecardId).then(function(data) {
        var questions;
        questions = data.data.result.content;
        helpers.storeById($scope.scorecard.questions, questions);
        helpers.parseQuestions($scope.scorecard.questions);
        return review.getReviewItems($stateParams.reviewId);
      }).then(function(data) {
        var answers;
        answers = data.data.result.content;
        helpers.parseAnswers($scope.scorecard.questions, answers);
        return $scope.loaded = true;
      });
    });
    return $scope.submit = function() {
      return $state.go('reviewStatus', {
        challengeId: $scope.challengeId
      });
    };
  };
})();
