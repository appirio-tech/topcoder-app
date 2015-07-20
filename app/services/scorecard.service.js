(function() {
  'use strict';

  angular.module('tc.services').factory('ScorecardService', ScorecardService);

  ScorecardService.$inject = ['CONSTANTS', 'ApiService'];

  function ScorecardService(CONSTANTS, ApiService) {
    var service = {
      getScorecardById: getScorecardById,
      getScorecard: getScorecard,
      getScorecardQuestions: getScorecardQuestions
    };
    return service;

    ///////////////

    function getScorecardById(scorecardId) {
        var url = CONSTANTS.API_URL + '/scorecards/?filter=' + encodeURIComponent('scorecardId=' + scorecardId);
        return ApiService.requestHandler('GET', url);
    }

    function getScorecard(challengeId) {
        var url = CONSTANTS.API_URL + '/scorecards/?filter=' + encodeURIComponent('challengeId=' + challengeId);
        return ApiService.requestHandler('GET', url);
    }

    function getScorecardQuestions(scorecardId) {
        var url = CONSTANTS.API_URL + '/scorecardQuestions/?filter=' + encodeURIComponent('scorecardId=' + scorecardId);
        return ApiService.requestHandler('GET', url);
    }
  };
})();
