(function() {
  // The EditReviewController controller fetches the scorecard template and any
  // answers saved but not submitted.

  'use strict';

  angular.module('tc.peer-review').controller('EditReviewController', EditReviewController);

  EditReviewController.$inject = ['$scope', '$state', '$stateParams', 'review', 'scorecard', 'user', 'challenge', 'helpers', '$q', 'CONSTANTS'];

  function EditReviewController($scope, $state, $stateParams, review, scorecard, user, challenge, helpers, $q, CONSTANTS) {
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

    $scope.submitReviewItems = function() {
      var body = helpers.compileReviewItems($scope.scorecard.questions, $scope.review, $scope.saved);

      review.saveReviewItems(body, $scope.saved)
      .then(function(response) {
        return review.markAsCompleted($stateParams.reviewId);
      })
      .then(function(response) {
        $state.go('review.status', {
          challengeId: $scope.challengeId
        });
      })
      .catch(function(error) {
        var message = 'An error occurred while trying to submit answers.\n' + error.status + ': ' + error.statusText;

        alert(message);

        $state.reload();
      });
    };

    $scope.saveReviewForLater = function() {
      var body = helpers.compileReviewItems($scope.scorecard.questions, $scope.review, $scope.saved);

      review.saveReviewItems(body, $scope.saved)
      .then(function(data) {
        $state.go('review.status', {
          challengeId: $scope.challengeId
        });
      })
      .catch(function(error) {
        var message = 'An error occurred while trying to update answers.\n' + error.status + ': ' + error.statusText;

        alert(message);

        $state.reload();
      });
    };

    var promises = [
      user.getUsername(),
      challenge.getChallengeDetails($scope.challengeId),
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

      })
      .then(function(data) {
        var answers = data.data.result.content;

        $scope.saved = helpers.parseAnswers($scope.scorecard.questions, answers);

        $scope.loaded = true;
      });
    });
  };
})();
