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
      var listType  = request && request.listType ? request.listType : 'upcoming';
      var userId  = request && request.userId ? request.userId : null;

      service.request = request;
      var filter = [];
      if (listType) {
        filter.push("listType=" + listType);
      }
      if (userId) {
        filter.push("userId=" + userId);
      }
      filter = filter.join("&");

      var filters = {
        sortColumn: sortColumn,
        sortOrder: sortOrder,
        filter: filter,
        //  statuses: "A,P,F",
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      return service.all("srms").getList(filters);
    }

    return service;
  }
})();
