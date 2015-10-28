(function () {
  'use strict';

  angular.module('tc.services').factory('SRMService', SRMService);

  SRMService.$inject = ['ApiService', '$filter', '$q', 'CONSTANTS'];

  function SRMService(ApiService, $filter, $q, CONSTANTS) {
    var api = ApiService.restangularV3;

    var service = {
      getSRMs: getSRMs,
      getUserSRMs: getUserSRMs,
      getSRMResults: getSRMResults,
      processSRM: processSRM
    };

    return service;

    function getSRMs(params) {
      return api.all('srms').getList(params);
    }

    function getUserSRMs(userHandle, params) {
      return api.one('members', userHandle).all('srms').getList(params);
    }

    // NOT Used deprecate
    function getSRMResults(params) {
      return api.all('srmResults').getList(params);
    }

    function processSRM (srm) {
      if (Array.isArray(srm.rounds) && srm.rounds.length) {
        if (srm.rounds[0].userSRMDetails && srm.rounds[0].userSRMDetails.rated) {
          srm.result = srm.rounds[0].userSRMDetails;
        }
        if (srm.rounds[0].codingStartAt) {
          srm.codingStartAt = srm.rounds[0].codingStartAt;
        }
        if (srm.rounds[0].codingEndAt) {
          srm.codingEndAt = srm.rounds[0].codingEndAt;
        }
        if (srm.rounds[0].registrationStartAt) {
          srm.registrationStartAt = srm.rounds[0].registrationStartAt;
        }
        if (srm.rounds[0].registrationEndAt) {
          srm.registrationEndAt = srm.rounds[0].registrationEndAt;
        }
      }

      // determines if the current phase is registration
      var start = moment(srm.registrationStartAt).unix();
      var end = moment(srm.registrationEndAt).unix();
      var now = moment().unix();
      if (start <= now && end >= now) {
        srm.currentPhase = CONSTANTS.REGISTRATION;
      }
      // determines if the current phase is coding
      var start = moment(srm.codingStartAt).unix();
      var end = moment(srm.codingEndAt).unix();
      var now = moment().unix();
      if (start <= now && end >= now) {
        srm.currentPhase = CONSTANTS.CODING;
      }
    }
  }
})();
