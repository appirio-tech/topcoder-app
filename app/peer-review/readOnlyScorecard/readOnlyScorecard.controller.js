(function() {
  'use strict';

  angular.module('tc.peer-review').controller('ReadOnlyScorecardController', ReadOnlyScorecardController);

  ReadOnlyScorecardController.$inject = ['$scope', '$stateParams', 'scorecard', 'helpers'];

  function ReadOnlyScorecardController($scope, $stateParams, scorecard, helpers) {
    var scorecardId;
    scorecardId = $stateParams.scorecardId;
    $scope.loaded = false;
    $scope.scorecard = {};
    return scorecard.getScorecardById(scorecardId).then(function(response) {
      var scorecard;
      scorecard = response.data.result.content[0];
      $scope.scorecard.name = scorecard.name;
      return scorecard.getScorecardQuestions(scorecardId).then(function(data) {
        var questions;
        $scope.scorecard.questions = {};
        questions = data.data.result.content;
        helpers.storeById($scope.scorecard.questions, questions);
        helpers.parseQuestions($scope.scorecard.questions);
        $scope.loaded = true;
      });
    });
  };
})();
