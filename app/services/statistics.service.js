(function () {
  'use strict';

  angular.module('tc.services').factory('StatisticsService', StatisticsService);

  StatisticsService.$inject = ['CONSTANTS', 'ApiService'];

  function StatisticsService(CONSTANTS, ApiService) {

    var service = {
      getDevTop: getDevTop,
      getDesignTop: getDesignTop,
      getDataTop: getDataTop
    };
    return service;

    ///////////////

    function getDevTop(size) {
      var url = CONSTANTS.API_URL_V2 + '/users/tops/develop?pageSize=' + size;
      return ApiService.requestHandler('GET', url);
    }

    function getDesignTop(size) {
      var url = CONSTANTS.API_URL_V2 + '/users/tops/design?pageSize=' + size;
      return ApiService.requestHandler('GET', url);
    }

    function getDataTop(size) {
      var url = CONSTANTS.API_URL_V2 + '/data/srm/statistics/tops?pageSize=' + size;
      return ApiService.requestHandler('GET', url);
    }
  };
})();

