import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('ScorecardService', ScorecardService)

  ScorecardService.$inject = ['CONSTANTS', 'ApiService']

  function ScorecardService(CONSTANTS, ApiService) {
    var api = ApiService.restangularV3

    var service = {
      getScorecardById: getScorecardById,
      getScorecard: getScorecard,
      getScorecardQuestions: getScorecardQuestions
    }
    return service

    ///////////////

    function getScorecardById(scorecardId) {
      return api.all('scorecards').getList({filter: encodeURIComponent('scorecardId='+scorecardId)})
        .then(function(data) {
          return data.plain()
        })
    }

    function getScorecard(challengeId) {
      return api.all('scorecards').getList({filter: encodeURIComponent('challengeId='+challengeId)})
      .then(function(data) {
        return data.plain()
      })
    }

    function getScorecardQuestions(scorecardId) {
      return api.all('scorecardQuestions').getList({filter: encodeURIComponent('scorecardId='+scorecardId)})
      .then(function(data) {
        return data.plain()
      })
    }
  }
})()
