(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('SRMController', SRMController);

  SRMController.$inject = ['UserService','SRMService', 'CONSTANTS'];

  function SRMController(UserService, SRMService, CONSTANTS) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.srms = [];
    vm.loading = true;

    var userId = UserService.getUserIdentity().userId;

    activate();

    function activate() {
      getSRMs();
    }

    function getSRMs() {
      var params = {
        filter: 'listType=future'
      };

      SRMService.getSRMs(params)
      .then(function(data){
        console.log('srms: ', data.plain());
        vm.srms = data;
        vm.loading = false;
      }, function(resp) {
        // TODO - handle error
        $log.error(resp);
        vm.loading = false;
      });
    }
  }
})();
