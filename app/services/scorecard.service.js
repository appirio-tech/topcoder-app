(function() {
  'use strict';

  angular.module('tc.peer-review').factory('scorecard', scorecard);

  scorecard.$inject = ['CONSTANTS', 'api'];

  function scorecard(CONSTANTS, api) {
    var service = {
      getScorecardById: getScorecardById,
      getScorecard: getScorecard,
      getScorecardQuestions: getScorecardQuestions
    };
    return service;

    ///////////////

    function getScorecardById(scorecardId) {
        var url = CONSTANTS.API_URL + '/scorecards/?filter=' + encodeURIComponent('scorecardId=' + scorecardId);
        return api.requestHandler('GET', url);
    }

    function getScorecard(challengeId) {
        var url = CONSTANTS.API_URL + '/scorecards/?filter=' + encodeURIComponent('challengeId=' + challengeId);
        return api.requestHandler('GET', url);
    }

    function getScorecardQuestions(scorecardId) {
        var url = CONSTANTS.API_URL + '/scorecardQuestions/?filter=' + encodeURIComponent('scorecardId=' + scorecardId);
        return api.requestHandler('GET', url);
    }
  };
})();
