(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('Dashboard.SRMController', SRMController);

  SRMController.$inject = ['UserService', 'TcAuthService','SRMService', 'CONSTANTS'];

  function SRMController(UserService, TcAuthService, SRMService, CONSTANTS) {
    var vm = this;
    // vm.communityBaseUrl = $location.protocol() + ":" + CONSTANTS.COMMUNITY_URL;
    vm.loading = true;
    vm.srms = [];
    vm.viewUpcomingSRMs = viewUpcomingSRMs;
    vm.viewPastSRMs = viewPastSRMs;


    function activate() {
      viewUpcomingSRMs();
    }

    // Fetches upcoming SRMs from the API
    function getSRMs(status, orderBy) {
      var userId = UserService.getUserIdentity().userId;
      vm.loading = true;
      SRMService.getSRMs({
        limit: 10,
        offset: 0,
        orderBy: orderBy, // TODO verify if this is the correct sort order clause,
        "filter[userId]": userId,
        "filter[status]": status
      }).then(function(data){
        vm.srms = data;
        vm.loading = false;
      }, function(resp) {
        $log.error(resp);
        // TODO - handle error
      });
    }

    /**
     * Fetches past SRMs of the logged in member
     *
     */
    function viewPastSRMs() {
      vm.listType = 'past';
      vm.srms = [];
      getSRMs('past', 'submissionEndDate asc');
    }

    /**
     * Fetches upcoming SRMs of the logged in member
     *
     */
    function viewUpcomingSRMs() {
      vm.srms = [];
      getSRMs('upcoming', 'submissionEndDate asc');
    }

    activate();
  }
})();
