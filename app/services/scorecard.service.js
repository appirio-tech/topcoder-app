(function() {
  'use strict';

  angular.module('tc.services').factory('ScorecardService', ScorecardService);

  ScorecardService.$inject = ['CONSTANTS', 'ApiService'];

  function ScorecardService(CONSTANTS, ApiService) {
    var api = ApiService.restangularV3
    var service = {
      getScorecardById: getScorecardById,
      getScorecard: getScorecard,
      getScorecardQuestions: getScorecardQuestions
    };
    return service;

    ///////////////

    function getScorecardById(scorecardId) {
        return api.all('scorecards').getList({filter: encodeURIComponent("scorecardId="+scorecardId)})
    }

    function getScorecard(challengeId) {
        return api.all('scorecards').getList({filter: encodeURIComponent("challengeId="+challengeId)})
    }

    function getScorecardQuestions(scorecardId) {
        return api.all('scorecardQuestions').getList({filter: encodeURIComponent("scorecardId="+scorecardId)})
    }
  };
})();
