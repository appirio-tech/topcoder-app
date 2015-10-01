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
    vm.listType = 'past';
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
    var userHandle = UserService.getUserIdentity().handle;

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
        getSRMs().then(function(data) {
          vm.loading = false;
        })
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
        return SRMService.getPastSRMs(userHandle, params)
          .then(handleSRMsLoad, handleSRMsFailure);
      } else {
        return SRMService.getSRMs(params)
        .then(handleSRMsLoad, handleSRMsFailure);
      }
    }

    function handleSRMsLoad(data) {
      vm.srms = data;
    }

    function handleSRMsFailure(data) {
      $log.error(resp);
    }

  }
})();
