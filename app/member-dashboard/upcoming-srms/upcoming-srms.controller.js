/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 * @author mdesiderio
 * @author vikas.agarwal@appirio.com
 * @version 1.0
 *
 * Controller for the upcoming srms widget
 */
(function () {

  /**
   * Create upcoming srm widget controller
   */
  angular
    .module('tc.myDashboard')
    .controller('UpcomingSRMsCtrl', UpcomingSRMsCtrl);

  /**
   * Inject dependencies
   * @type {string[]}
   */
  UpcomingSRMsCtrl.$inject = ['$scope', '$location', 'tcAuth','srms', 'CONSTANTS'];

  /**
   * Controller implementation
   *
   * @param $scope
   * @param SRMServices services to access topcoder API for SRM data
   * @constructor
   */
  function UpcomingSRMsCtrl($scope, $location, tcAuth, SRMService, CONSTANTS) {
    var vm = this;
    vm.communityBaseUrl = $location.protocol() + ":" + CONSTANTS.COMMUNITY_URL;
    vm.loading = true;
    vm.pageIndex = 1;
    vm.pageSize = 5;
    vm.sortColumn = 'registrationStartTime';
    vm.sortOrder = 'asc';
    vm.totalPages = 1;
    vm.totalRecords = vm.totalPages * vm.pageSize;
    vm.firstRecordIndex = (vm.pageIndex - 1) * vm.pageSize + 1;
    vm.lastRecordIndex = vm.totalPages * vm.pageSize;
    vm.pageLinks = [];
    vm.prevPageLink = {};
    vm.nextPageLink = {};
    vm.changePage = changePage;
    vm.isCurrentPage = isCurrentPage;
    vm.getCurrentPageClass = getCurrentPageClass;
    vm.sort = sort;
    vm.view = 'tiles';
    vm.viewUpcomingSRMs = viewUpcomingSRMs;
    vm.viewPastSRMs = viewPastSRMs;

    // activate controller
    if (tcAuth.isAuthenticated() === true) {
      getSRMs();
    } else {
      return false;
    }

    /**
     * getSRMs Fetches upcoming SRMs from the API
     *
     * @return {Object} promise of API call
     */
    function getSRMs() {
      initPaging();
      var searchRequest = {
        pageIndex: vm.pageIndex,
        pageSize: vm.pageSize,
        sortColumn: vm.sortColumn,
        sortOrder: vm.sortOrder
       };
      // start loading
      vm.loading = true;
      // Fetch the future srms scheduled
      return SRMService.getSRMSchedule(searchRequest)
        .then(function(data) {
          if (data.pagination) {
            vm.totalPages = Math.ceil(data.pagination.total / vm.pageSize);
            vm.totalRecords = data.pagination.total;
            vm.firstRecordIndex = (vm.pageIndex - 1) * vm.pageSize + 1;
            vm.lastRecordIndex = vm.pageIndex * vm.pageSize;
            vm.lastRecordIndex = vm.lastRecordIndex > vm.totalRecords ? vm.totalRecords : vm.lastRecordIndex;
          }
          vm.upcomingSRMs = data;
          vm.loading = false;
      });
    }

    /**
     * changePage changes page in the result set
     *
     * @param {JSON} pageLink page link object
     *
     * @return {Object} promise of API call with updated pageIndex
     */
    function changePage(pageLink) {
      vm.pageIndex = pageLink.val;
      getSRMs();
    }

    /**
     * isCurrentPage checks if the give page link is the current page
     *
     * @param {JSON} pageLink page link object
     *
     * @return {Boolean} true if the given page is the current page, false otherwise
     */
    function isCurrentPage (pageLink) {
      return pageLink.val === vm.pageIndex;
    }

    /**
     * getCurrentPageClass Identifies the css class to be used for the given page link
     *
     * @param {JSON} pageLink page link object
     *
     * @return {String}
     */
    function getCurrentPageClass(pageLink) {
      return isCurrentPage(pageLink) ? 'current-page' : '';
    }

    /**
     * sort sorts the results based on the given column
     *
     * @param {String} column page link object
     *
     * @return {Object} promise of API call with updated sort params
     */
    function sort(column) {
      if (vm.sortColumn === column) {
        vm.sortOrder = vm.sortOrder === 'desc' ? 'asc' : 'desc';
      } else {
        vm.sortOrder = 'desc';
      }
      vm.sortColumn = column;
      getSRMs();
    }

    /**
     * initPaging Initializes the paging
     */
    function initPaging() {
      vm.prevPageLink = {text: "Prev", val: vm.pageIndex - 1};
      vm.nextPageLink = {text: "Next", val: vm.pageIndex + 1};
    }

    /**
     * Fetches past SRMs of the logged in member
     *
     */
    function viewPastSRMs() {
      vm.listType = 'past';
      vm.srms = [];
      getSRMs();
    }

    /**
     * Fetches upcoming SRMs of the logged in member
     *
     */
    function viewUpcomingSRMs() {
      vm.listType = 'upcoming';
      vm.srms = [];
      getSRMs();
    }
  }


})();