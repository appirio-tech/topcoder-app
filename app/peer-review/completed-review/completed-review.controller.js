(function() {
  'use strict';

  angular.module('tc.peer-review').controller('CompletedReviewController',  CompletedReviewController);

  CompletedReviewController.$inject = ['$stateParams', 'ScorecardService', 'ReviewService', 'UserService', 'ChallengeService', 'Helpers', '$q', 'CONSTANTS'];

  function CompletedReviewController($stateParams, ScorecardService, ReviewService, UserService, ChallengeService, Helpers, $q, CONSTANTS) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.challengeId = $stateParams.challengeId;
    vm.loaded = false;
    vm.stats = {};
    vm.scorecard = {
      questions: {}
    };
    var handle = UserService.getUserIdentity().handle;
    vm.submit = function() {
      $state.go('review.status', {
        challengeId: vm.challengeId
      });
    };

    activate();

    function activate() {
      var promises = [
        ChallengeService.getChallengeDetails($stateParams.challengeId),
        ReviewService.getReview($stateParams.reviewId),
        ScorecardService.getScorecard(vm.challengeId)
      ];

      $q.all(promises)
      .then(function(responses) {
        vm.stats.username = handle;

        vm.challenge = responses[0];

        vm.review = responses[1];
        vm.stats.submissionId = vm.review.submissionId;
        vm.stats.uploadId = vm.review.uploadId;
        vm.stats.createdAt = vm.review.createdAt;
        vm.stats.updatedAt = vm.review.updatedAt;

        var scorecardData = responses[2][0];
        var scorecardId = scorecardData.id;

        ScorecardService.getScorecardQuestions(scorecardId)
        .then(function(questions) {
          Helpers.storeById(vm.scorecard.questions, questions);
          Helpers.parseQuestions(vm.scorecard.questions);

          return ReviewService.getReviewItems($stateParams.reviewId);

        }).then(function(answers) {

          Helpers.parseAnswers(vm.scorecard.questions, answers);

          vm.loaded = true;
        });
      });
    }
  };
})();
