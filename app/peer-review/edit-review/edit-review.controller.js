(function() {
  // The EditReviewController controller fetches the scorecard template and any
  // answers saved but not submitted.

  'use strict';
  var EditReviewController;

  angular.module('tc.peer-review').controller('EditReviewController', EditReviewController);

  EditReviewController.$inject = ['$scope', '$state', '$stateParams', 'review', 'scorecard', 'user', 'challenge', 'helpers', '$q', 'CONSTANTS'];

  function EditReviewController($scope, $state, $stateParams, review, scorecard, user, challenge, helpers, $q, CONSTANTS) {
    var promises;
    $scope.submissionDownloadPath = CONSTANTS.submissionDownloadPath;
    $scope.domain = CONSTANTS.domain;
    $scope.challengeId = $stateParams.challengeId;
    $scope.challenge = null;
    $scope.loaded = false;
    $scope.saved = false;
    $scope.stats = {};
    $scope.scorecard = {
      questions: {}
    };
    promises = [user.getUsername(), challenge.getChallengeDetails($scope.challengeId), review.getReview($stateParams.reviewId), scorecard.getScorecard($scope.challengeId)];
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
        $scope.saved = helpers.parseAnswers($scope.scorecard.questions, answers);
        return $scope.loaded = true;
      });
    });
    $scope.submitReviewItems = function() {
      var body;
      body = helpers.compileReviewItems($scope.scorecard.questions, $scope.review, $scope.saved);
      return review.saveReviewItems(body, $scope.saved).then(function(response) {
        return review.markAsCompleted($stateParams.reviewId);
      }).then(function(response) {
        return $state.go('reviewStatus', {
          challengeId: $scope.challengeId
        });
      })["catch"](function(error) {
        var message;
        message = 'An error occurred while trying to submit answers.\n' + error.status + ': ' + error.statusText;
        alert(message);
        return $state.reload();
      });
    };
    return $scope.saveReviewForLater = function() {
      var body;
      body = helpers.compileReviewItems($scope.scorecard.questions, $scope.review, $scope.saved);
      return review.saveReviewItems(body, $scope.saved).then(function(data) {
        return $state.go('reviewStatus', {
          challengeId: $scope.challengeId
        });
      })["catch"](function(error) {
        var message;
        message = 'An error occurred while trying to update answers.\n' + error.status + ': ' + error.statusText;
        alert(message);
        return $state.reload();
      });
    };
  };
})();
