(function() {
  'use strict';

  angular.module('tc.services').factory('ChallengeService', ChallengeService);

  ChallengeService.$inject = ['CONSTANTS', 'ApiService'];

  function ChallengeService(CONSTANTS, ApiService) {
    var api = ApiService.restangularV3;

    var service = {
      getChallenges: getChallenges,
      getUserChallenges: getUserChallenges,
      getiOSChallenges: getiOSChallenges,
      getReviewEndDate: getReviewEndDate,
      getChallengeDetails: getChallengeDetails,
      processActiveDevDesignChallenges: processActiveDevDesignChallenges,
      processActiveMarathonMatches: processActiveMarathonMatches
    };

    return service;

    function getChallenges(params) {
      params.filter = _parseFilterParam(params);
      return api.all('challenges').getList(params);
    }

    function getUserChallenges(handle, params) {
      params.filter = _parseFilterParam(params);
      return api.one('members', handle).all('challenges').getList(params);
    }

    function getUserMarathonMatches(handle, params) {
      return api.all('members', handle).all('mms').getList(params);
    }

    function getiOSChallenges(params) {
      return api.all('challenges').getList(params);
    }

    function getReviewEndDate(challengeId) {
      var url = CONSTANTS.API_URL + '/phases/?filter=' + encodeURIComponent('challengeId=' + challengeId + ' & phaseType=4');
      return ApiService.requestHandler('GET', url);
    }

    function getChallengeDetails(challengeId) {
      var url = CONSTANTS.API_URL + '/challenges/' + challengeId;
      return ApiService.requestHandler('GET', url, {}, true);
    }

    function processActiveDevDesignChallenges(challenges) {
      angular.forEach(challenges, function(challenge) {
        var phases = challenge.currentPhases;
        var hasCurrentPhase = false;
        // If currentPhase is null, the challenge is stalled and there is no end time
        challenge.userCurrentPhase = 'Stalled';
        challenge.userCurrentPhaseEndTime = null;
        challenge.userAction = null;

        if (phases && phases.length) {
          hasCurrentPhase = true;
          challenge.userCurrentPhase = phases[0].phaseType;
          challenge.userCurrentPhaseEndTime = phases[0].scheduledEndTime;
        }

        if (hasCurrentPhase && phases.length > 1) {
          angular.forEach(challenge.currentPhases, function(phase, index, phases) {
            if (phase.phaseType === 'Submission') {
              challenge.userAction = 'Submit';

              if (challenge.userDetails.hasUserSubmittedForReview) {
                challenge.userCurrentPhase = phase.phaseType;
                challenge.userCurrentPhaseEndTime = phase.scheduledEndTime;
                challenge.userAction = 'Submitted';

                if (phases[index + 1]) {
                  challenge.userCurrentPhase = phases[index + 1].phaseType;
                  challenge.userCurrentPhaseEndTime = phases[index + 1].scheduledEndTime;
                  challenge.userAction = null;
                }
              }
            }
          });
        }

        if (challenge.userCurrentPhaseEndTime) {
          var timeAndUnit = moment(challenge.userCurrentPhaseEndTime).fromNow(true);
          // Split into components: ['an', 'hour'] || ['2', months]
          timeAndUnit = timeAndUnit.split(' ');

          if (timeAndUnit[0] === 'a' || timeAndUnit[0] === 'an') {
            timeAndUnit[0] = '1';
          }
          challenge.userCurrentPhaseEndTime = timeAndUnit;
        }
      });
    }

    function processActiveMarathonMatches(marathonMatches) {
      angular.forEach(marathonMatches, function(match) {
        var rounds = match.rounds;
        var hasCurrentRound = false;

        match.userCurrentPhase = 'Stalled';
        match.userCurrentPhaseEndTime = null;
        match.userAction = null;

        if (rounds && rounds.length) {
          hasCurrentRound = true;
          match.userCurrentPhase = 'Registration';
          match.userCurrentPhaseEndTime = rounds[0].registrationEndAt;
          match.userAction = 'Registered';

          if (moment().isAfter(rounds[0].codingStartAt)) {
            match.userCurrentPhase = 'Coding';
            match.userCurrentPhaseEndTime = rounds[0].codingEndAt;
            match.userAction = 'Submit';
          }

          if (moment().isAfter(rounds[0].systemTestStartAt)) {
            match.userCurrentPhase = 'System Test Phase';
            match.userCurrentPhaseEndTime = rounds[0].systemTestEndAt;
            match.userAction = null;
          }
        }

        if (challenge.userCurrentPhaseEndTime) {
          var timeAndUnit = moment(challenge.userCurrentPhaseEndTime).fromNow(true);
          // Split into components: ['an', 'hour'] || ['2', months]
          timeAndUnit = timeAndUnit.split(' ');

          if (timeAndUnit[0] === 'a' || timeAndUnit[0] === 'an') {
            timeAndUnit[0] = '1';
          }
          challenge.userCurrentPhaseEndTime = timeAndUnit;
        }
      });
    }

    /**
     * Helper method to parse the filter param as required by v3 API from JSON format
     */
    function _parseFilterParam(params) {
      var filter = [];
      if (params.filter) {
        for(var filterKey in params.filter) {
          var filterValue = params.filter[filterKey];
          filter.push(filterKey + '=' + filterValue);
        }
        return filter.join('&');
      }
      return null;
    }

  };

})();
