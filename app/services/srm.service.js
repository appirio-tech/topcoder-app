/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 * @author mdesiderio
 * @version 1.0
 *
 * SRMService. Factory to access topcoder API to retrieve SRM related info
 */
(function () {

  angular
    .module('tc.myDashboard')
    .factory('srms', SRMService);

  SRMService.$inject = ['Restangular', '$filter'];

  /**
   * SRMService 
   * @param Restangular to access the REST api
   * @param $filter used to format the date
   * @constructor
   */
  function SRMService(Restangular, $filter) {

    var service = Restangular.withConfig(function(RestangularConfigurer) {
    });

    /**
     * getSRMSchedule returns list of upcoming SRMs currently scheduled
     *
     */
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