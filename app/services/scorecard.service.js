(function() {
  'use strict';

  angular.module('tc.peer-review').factory('scorecard', scorecard);

  scorecard.$inject = ['CONSTANTS', 'api'];

  function scorecard(CONSTANTS, api) {
    return {
      getScorecardById: function(scorecardId) {
        var url;
        url = CONSTANTS.API_URL + '/scorecards/?filter=' + encodeURIComponent('scorecardId=' + scorecardId);
        return api.requestHandler('GET', url);
      },
      getScorecard: function(challengeId) {
        var url;
        url = CONSTANTS.API_URL + '/scorecards/?filter=' + encodeURIComponent('challengeId=' + challengeId);
        return api.requestHandler('GET', url);
      },
      getScorecardQuestions: function(scorecardId) {
        var url;
        url = CONSTANTS.API_URL + '/scorecardQuestions/?filter=' + encodeURIComponent('scorecardId=' + scorecardId);
        return api.requestHandler('GET', url);
      }
    };
  };
})();
