import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('ScorecardService', ScorecardService)

  ScorecardService.$inject = ['CONSTANTS', 'ApiService']

  function ScorecardService(CONSTANTS, ApiService) {
    var api = ApiService.restangularV3
    var _config = {
      cache: false,
      skipAuthorization: true
    }

    var service = {
      getScorecardById: getScorecardById,
      getScorecard: getScorecard,
      getScorecardQuestions: getScorecardQuestions
    }
    return service

    ///////////////

    function getScorecardById(scorecardId) {
      return api.all('scorecards').withHttpConfig(_config).getList({filter: encodeURIComponent('scorecardId='+scorecardId)})
        .then(function(data) {
          return data.plain()
        })
    }

    function getScorecard(challengeId) {
      return api.all('scorecards').withHttpConfig(_config).getList({filter: encodeURIComponent('challengeId='+challengeId)})
      .then(function(data) {
        return data.plain()
      })
    }

    function getScorecardQuestions(scorecardId) {
      return api.all('scorecardQuestions').withHttpConfig(_config).getList({filter: encodeURIComponent('scorecardId='+scorecardId)})
      .then(function(data) {
        return data.plain()
      })
    }
  }
})()
