(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('SRMController', SRMController);

  SRMController.$inject = ['UserService','SRMService', 'CONSTANTS'];

  function SRMController(UserService, SRMService, CONSTANTS) {
    var vm = this;
    vm.loading = true;
    vm.srms = [];

    vm.viewPastSRMs = viewPastSRMs;
    vm.viewUpcomingSRMs = viewUpcomingSRMs;

    var activate = function() {
      viewUpcomingSRMs();
    }

    var userId = UserService.getUserIdentity().userId;

    // get ACTIVE challenges & marathon matches
    var getSRMs = function(status, orderBy) {
      vm.loading = true;
      SRMService.getSRMs({
        limit: 10,
        offset: 0,
        orderBy: orderBy, // TODO verify if this is the correct sort order clause,
        filter: "userId="+userId+"&status="+status
      }).then(function(data){
        vm.myChallenges = data;
        vm.loading = false;
      }, function(resp) {
        $log.error(resp);
        // TODO - handle error
      });
    }

    function viewUpcomingSRMs() {
      vm.srms = [];
      getSRMs('upcoming', 'submissionEndDate asc');
    };

    function viewPastSRMs() {
      vm.srms = [];
      getSRMs('past', 'submissionEndDate asc');
    };

    activate();
  }


})();
