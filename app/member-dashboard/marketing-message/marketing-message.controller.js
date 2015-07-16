(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('MarketingMessageController', MarketingMessageController);

  MarketingMessageController.$inject = ['$scope', 'MARKETING_MESSAGE_URL', '$sce'];

  function MarketingMessageController($scope, MARKETING_MESSAGE_URL, $sce) {
    var vm = this;
    vm.marketingMessageURL = "";

    activate();

    function activate() {
      // set marketing message banner iframe url
      vm.marketingMessageURL = $sce.trustAsResourceUrl(MARKETING_MESSAGE_URL);
    }
  }
})();
