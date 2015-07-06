(function() {
  'use strict';

  angular.module('tc.peer-review').controller('ReadOnlyScorecardController', ReadOnlyScorecardController);

  ReadOnlyScorecardController.$inject = ['$scope', '$stateParams', 'scorecard', 'helpers'];

  function ReadOnlyScorecardController($scope, $stateParams, scorecard, helpers) {
    var scorecardId = $stateParams.scorecardId;

    $scope.loaded = false;
    $scope.scorecard = {};

    scorecard.getScorecardById(scorecardId)
    .then(function(response) {
      var scorecardData = response.data.result.content[0];
      $scope.scorecard.name = scorecardData.name;

      scorecard.getScorecardQuestions(scorecardId)
      .then(function(data) {
        $scope.scorecard.questions = {};

        var questions = data.data.result.content;

        helpers.storeById($scope.scorecard.questions, questions);
        helpers.parseQuestions($scope.scorecard.questions);

        $scope.loaded = true;
      });
    });
  };
})();
