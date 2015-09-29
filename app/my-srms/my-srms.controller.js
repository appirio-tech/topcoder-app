(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('MySRMsController', MySRMsController);

  MySRMsController.$inject = ['UserService','SRMService', '$log'];

  function MySRMsController(UserService, SRMService, $log) {
    var vm = this;
    vm.srms = [];
    vm.srmResults = [];
    vm.loading = true;
    vm.view = 'tile';
    vm.changeView = changeView;
    vm.listType = 'future';
    vm.viewUpcomingSRMs = viewUpcomingSRMs;
    vm.viewPastSRMs = viewPastSRMs;
    // paging params, these are updated by tc-pager
    vm.pageParams = {
      offset : 0,
      limit: 16,
      count: 0,
      totalCount: 0,
      // counter used to indicate page change
      updated: 0
    };

    var userId = UserService.getUserIdentity().userId;

    activate();

    function activate() {
      getSRMs().then(function() {
        vm.loading = false;
      });
    }

    function changeView(view) {
      vm.view = view;
    }

    function viewPastSRMs() {
      if (vm.listType != 'past') {
        vm.srms = [];
        vm.listType = 'past';
        vm.loading = true;
        getSRMs().then(function() {
          getSRMResults().then(function() {
            angular.forEach(vm.srms, function(srm) {
              if (vm.srmResults[srm.id]) {
                srm.result = vm.srmResults[srm.id];
              }
              vm.loading = false;
            });
          });
        });
      }
    }

    function viewUpcomingSRMs() {
      if (vm.listType != 'future') {
        vm.srms = [];
        vm.listType = 'future';
        vm.loading = true;
        getSRMs().then(function() {
          vm.loading = false;
        });
      }
    }

    function getSRMs() {
      var params = {
        limit: vm.pageParams.limit,
        offset: vm.pageParams.offset,
        filter: 'status=' + vm.listType
      };
      if (vm.listType == 'past') {
        params.filter += '&userIds=' + userId;
      }

      return SRMService.getSRMs(params)
      .then(function(data){
        vm.srms = data;
      }, function(resp) {
        // TODO - handle error
        $log.error(resp);
      });
    }

    function getSRMResults() {
      var params = {
        filter: 'userId=' + userId
      };

      return SRMService.getSRMResults(params)
      .then(function(data){
        angular.forEach(data, function(srmResult) {
          vm.srmResults[srmResult['contestId']] = srmResult;
        });
      }, function(resp) {
        // TODO - handle error
        $log.error(resp);
      });
    }
  }
})();
