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

    function getPastSRMs(userHandle, params) {
      return api.one('members', userHandle).all('srms').getList(params)
      .then(function(srms) {
        // var resultParams =  {
        //   filter: 'userId=' + userId
        // };
        // return getSRMResults(resultParams).then(function(results) {
        //   var resultsMap = [];
        //   angular.forEach(results, function(result) {
        //     resultsMap[result['contestId']] = result;
        //   });
        //   angular.forEach(srms, function(srm) {
        //     if (resultsMap[srm.id]) {
        //       srm.result = resultsMap[srm.id];
        //     }
        //   });
          return srms;
        });
    }

    function getSRMResults(params) {
      return api.all('srmResults').getList(params);
    }
  }
})();
