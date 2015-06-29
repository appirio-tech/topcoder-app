(function() {
  'use strict';

  angular.module('topcoder').factory('challenge', challenge);

  challenge.$inject = ['CONSTANTS', 'api'];

  function challenge(CONSTANTS, api) {
    return {
      getReviewEndDate: function(challengeId) {
        var url;
        url = CONSTANTS.API_URL + '/challenges/' + challengeId + '/phases/?filter=' + encodeURIComponent('challengeId=' + challengeId + ' & phaseType=4');
        return api.requestHandler('GET', url);
      },
      getChallengeDetails: function(challengeId) {
        var url = CONSTANTS.API_URL_V2 + '/challenges/' + challengeId;
        return api.requestHandler('GET', url, {}, true);
      }
    };
  };

})();
