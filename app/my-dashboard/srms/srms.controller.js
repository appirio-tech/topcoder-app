(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('SRMWidgetController', SRMWidgetController);

  SRMWidgetController.$inject = ['UserService','SRMService', '$log'];

  function SRMWidgetController(UserService, SRMService, $log) {
    var vm = this;
    vm.srms = [];
    vm.loading = true;

    var userId = UserService.getUserIdentity().userId;

    activate();

    function activate() {
      getSRMs();
    }

    function getSRMs() {
      var params = {
        filter: 'status=future',
        limit: 3
      };

      SRMService.getSRMs(params)
      .then(function(data){
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
