(function() {
  'use strict';

  angular.module('tc.peer-review').controller('ReviewStatusController', ReviewStatusController);

  ReviewStatusController.$inject = ['$scope', '$state', '$stateParams', 'review', 'challenge', 'helpers', 'CONSTANTS'];

  function ReviewStatusController($scope, $state, $stateParams, review, challenge, helpers, CONSTANTS) {
    $scope.submissionDownloadPath = CONSTANTS.submissionDownloadPath;
    $scope.domain = CONSTANTS.domain;
    $scope.loaded = false;
    $scope.challengeId = $stateParams.challengeId;
    $scope.challenge = null;
    $scope.getNextReview = function() {
      if ($scope.reviews.length >= 5) {
        alert('You may only complete 5 reviews.');
        return;
      }
      review.getNextReview($scope.challengeId).then(function(data) {
        var newReviewId = data.data.result.content;

        $state.go('edit', {
          challengeId: $scope.challengeId,
          reviewId: newReviewId
        });
      }).catch(function(error) {
        var message = 'An error occurred while trying to get the next review.\n' + error.status + ': ' + error.statusText;
        console.log(message);
        $state.reload();
      });
    };

    challenge.getChallengeDetails($scope.challengeId).then(function(data) {
      $scope.challenge = data.data;
    });
    review.getUsersPeerReviews($scope.challengeId).then(function(data) {
      $scope.reviews = data.data.result.content;
      $scope.completed = helpers.countCompleted($scope.reviews);
      return $scope.loaded = true;
    });
    return challenge.getReviewEndDate($scope.challengeId).then(function(data) {
      return $scope.reviewsDue = data.data.result.content[0].scheduledEndTime + ' UTC';
    });
  };
})();
