(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('MySRMsController', MySRMsController);

  MySRMsController.$inject = ['UserService','SRMService', '$log'];

  function MySRMsController(UserService, SRMService, $log) {
    var vm = this;
    vm.srms = [];
    vm.srmResults = [];
    vm.loading = true;
    vm.view = 'list';
    vm.changeView = changeView;
    vm.listType = 'future';
    vm.viewUpcomingSRMs = viewUpcomingSRMs;
    vm.viewPastSRMs = viewPastSRMs;

    var userId = UserService.getUserIdentity().userId;

    activate();

    function activate() {
      getSRMs();
    }

    function changeView(view) {
      vm.view = view;
    }

    function viewPastSRMs() {
      vm.listType = 'past';
      getSRMs();
      getSRMs().then(function() {
        getSRMResults().then(function() {
          angular.forEach(vm.srms, function(srm) {
            if (vm.srmResults[srm.id]) {
              srm.result = vm.srmResults[srm.id];
            }
          });
        });
      });
    }

    function viewUpcomingSRMs() {
      vm.listType = 'future';
      getSRMs();
    }

    function getSRMs() {
      var params = {
        filter: 'listType=' + vm.listType
      };
      if (vm.listType == 'past') {
        params.filter += '&userId=' + userId;
      }

      return SRMService.getSRMs(params)
      .then(function(data){
        vm.srms = data;
        vm.loading = false;
      }, function(resp) {
        // TODO - handle error
        $log.error(resp);
        vm.loading = false;
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
        vm.loading = false;
      }, function(resp) {
        // TODO - handle error
        $log.error(resp);
        vm.loading = false;
      });
    }
  }
})();
