(function () {
  'use strict';

  angular.module('tc.services').factory('SRMService', SRMService);

  SRMService.$inject = ['ApiService', '$filter'];

  function SRMService(ApiService, $filter) {

    var service = ApiService.restangularV2;

    // Returns list of upcoming SRMs currently scheduled
    service.getSRMSchedule = function(request) {

      // add default paging
      var pageIndex = request && request.pageIndex ? request.pageIndex : 1;
      var pageSize = request && request.pageSize ? request.pageSize : 10;
      var sortColumn  = request && request.sortColumn ? request.sortColumn : 'registrationStartTime';
      var sortOrder  = request && request.sortOrder ? request.sortOrder : 'asc';

      service.request = request;

      var filters = {
        sortColumn: sortColumn,
        sortOrder: sortOrder,
        registrationStartTimeAfter: $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss.sssZ'),
        statuses: "A,P,F",
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      return service.one("data").one("srm").getList("schedule", filters);
    }

    return service;
  }
})();
