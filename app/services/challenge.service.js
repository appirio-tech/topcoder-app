(function() {
  'use strict';

  angular.module('topcoder').factory('challenge', challenge);

  challenge.$inject = ['CONSTANTS', 'api'];

  function challenge(CONSTANTS, api) {
    var service = {
      getReviewEndDate: getReviewEndDate,
      getChallengeDetails: getChallengeDetails
    };
    return service;

    function getReviewEndDate(challengeId) {
      var url = CONSTANTS.API_URL + '/challenges/' + challengeId + '/phases/?filter=' + encodeURIComponent('challengeId=' + challengeId + ' & phaseType=4');
      return api.requestHandler('GET', url);
    }

    function getChallengeDetails(challengeId) {
      var url = CONSTANTS.API_URL_V2 + '/challenges/' + challengeId;
      return api.requestHandler('GET', url, {}, true);
    }
  };

})();
