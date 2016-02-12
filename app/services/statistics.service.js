import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.services').factory('StatisticsService', StatisticsService)

  StatisticsService.$inject = ['CONSTANTS', 'ApiService']

  function StatisticsService(CONSTANTS, ApiService) {

    var service = {
      getDevTop: getDevTop,
      getDesignTop: getDesignTop,
      getDataTop: getDataTop,
      getPlatformStats: getPlatformStats
    }
    return service

    ///////////////


    function getPlatformStats() {
      return ApiService.restangularV2.all('platform')
        .withHttpConfig({skipAuthorization: true})
        .customGET('statistics')
    }

    function getDevTop(size) {
      return ApiService.restangularV2.all('users')
        .withHttpConfig({skipAuthorization: true})
        .customGET('tops/develop', {pageSize: size})
    }

    function getDesignTop(size) {
      return ApiService.restangularV2.all('users')
        .withHttpConfig({skipAuthorization: true})
        .customGET('tops/design', {pageSize: size})
    }

    function getDataTop(size) {
      return ApiService.restangularV2.all('data')
        .withHttpConfig({skipAuthorization: true})
        .customGET('srm/statistics/tops', {pageSize: size})
    }
  }
})()

