(function() {
  'use strict';

  angular.module('tc.peer-review').controller('ReadOnlyScorecardController', ReadOnlyScorecardController);

  ReadOnlyScorecardController.$inject = ['$stateParams', 'scorecard', 'helpers'];

  function ReadOnlyScorecardController($stateParams, scorecard, helpers) {
    var scorecardId = $stateParams.scorecardId;
    var vm = this;
    vm.loaded = false;
    vm.scorecard = {};

    activate();

    function activate() {
      scorecard.getScorecardById(scorecardId)
      .then(function(response) {
        var scorecardData = response.data.result.content[0];
        vm.scorecard.name = scorecardData.name;

        scorecard.getScorecardQuestions(scorecardId)
        .then(function(data) {
          vm.scorecard.questions = {};

          var questions = data.data.result.content;

          helpers.storeById(vm.scorecard.questions, questions);
          helpers.parseQuestions(vm.scorecard.questions);

          vm.loaded = true;
        });
      });
    }
  };
})();
