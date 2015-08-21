(function () {
  'use strict';

  angular.module('tc.services').factory('SRMService', SRMService);

  SRMService.$inject = ['ApiService', '$filter', '$q'];

  function SRMService(ApiService, $filter, $q) {
    var api = ApiService.restangularV3;

    var service = {
      getSRMs: getSRMs,
      getSRMResults: getSRMResults
    };

    return service;

    function getSRMs(params) {
      return api.all('srms').getList(params);
    }

    function getSRMResults(params) {
      return api.all('srmResults').getList(params);
    }
  }
})();
