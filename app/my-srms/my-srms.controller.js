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
    vm.userHasSrms = false;
    vm.noSrmsMessage = null;
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
      // workaround to by pass the check, which is there to avoid duplicate calls
      // otherwise viewPastSRMs would not work
      vm.listType = 'future';
      viewPastSRMs();
    }

    function changeView(view) {
      vm.view = view;
    }

    function viewPastSRMs() {
      if (vm.listType != 'past') {
        vm.srms = [];
        vm.listType = 'past';
        vm.loading = true;
        vm.userHasSrms = false;
        getSRMs().then(function() {
          if (!vm.srms || vm.srms.length == 0) {
            vm.noSrmsMessage = "You have not participated in any SRMs yet.";
          }
          vm.loading = false;
        })
      }
    }

    function viewUpcomingSRMs() {
      if (vm.listType != 'future') {
        vm.srms = [];
        vm.listType = 'future';
        vm.loading = true;
        vm.userHasSrms = false;
        getSRMs().then(function() {
          if (!vm.srms || vm.srms.length == 0) {
            vm.noSrmsMessage = "Sorry! There is no upcoming SRM as of now.";
          }
          vm.loading = false;
        });
      }
    }

    function getSRMs() {
      vm.isError = false;
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
      if (data.length > 0) {
        vm.userHasSrms = true;
      }
      vm.srms = data;
    }

    function handleSRMsFailure(data) {
      $log.error(resp);
      vm.isError = true;
      vm.userHasSrms = false;
    }

  }
})();
