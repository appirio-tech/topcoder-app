(function () {
  'use strict';

  angular.module('tc.services').factory('SRMService', SRMService);

  SRMService.$inject = ['ApiService', '$filter', '$q'];

  function SRMService(ApiService, $filter, $q) {
    var api = ApiService.restangularV3;

    var service = {
      getSRMs: getSRMs,
      getPastSRMs: getPastSRMs,
      getSRMResults: getSRMResults
    };

    return service;

    function getSRMs(params) {
      return api.all('srms').getList(params);
    }

    function getPastSRMs(userHandle, params, filterUnRated) {
      filterUnRated = filterUnRated || true;
      return api.one('members', userHandle).all('srms').getList(params).then(function(srms) {
        // filter un rated SRMs
        if (filterUnRated) {
          srms = _.filter(srms, function(s) {
            return _.isArray(s.rounds) && s.rounds.length && !_.isUndefined(s.rounds[0].userSRMDetails) && s.rounds[0].userSRMDetails.rated;
          });
        }
        return srms;
      });
    }

    // NOT Used deprecate
    function getSRMResults(params) {
      return api.all('srmResults').getList(params);
    }
  }
})();
