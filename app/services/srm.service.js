(function () {
  'use strict';

  angular.module('tc.services').factory('SRMService', SRMService);

  SRMService.$inject = ['ApiService', '$filter', '$q'];

  function SRMService(ApiService, $filter, $q) {

    var service = {
      getSRMs: getSRMs
    };
    return service;

    function getSRMs(params) {
      var deferred = $q.defer();
      deferred.resolve([]);
      return deferred.promise;
    }

    // Returns list of upcoming SRMs currently scheduled
    service.getSRMSchedule = function(request) {

      // add default paging
      var pageIndex = request && request.pageIndex ? request.pageIndex : 1;
      var pageSize = request && request.pageSize ? request.pageSize : 10;
      var sortColumn  = request && request.sortColumn ? request.sortColumn : 'registrationStartTime';
      var sortOrder  = request && request.sortOrder ? request.sortOrder : 'asc';
      var listType  = request && request.listType ? request.listType : 'future';
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
