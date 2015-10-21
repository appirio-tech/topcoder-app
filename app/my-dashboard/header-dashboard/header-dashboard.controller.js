(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('HeaderDashboardController', HeaderDashboardController);

  HeaderDashboardController.$inject = [
    '$stateParams',
    'NotificationService',
    'ProfileService',
    'userIdentity',
    'profile',
    '$log',
    '$filter'
  ];

  function HeaderDashboardController($stateParams, NotificationService, ProfileService, userIdentity, profile, $log, $filter) {
    var vm = this;
    vm.profile = profile;
    vm.handleColor = $filter('ratingColor')(_.get(profile, 'maxRating.rating', 0));

    activate();

    function activate() {
      vm.loading = true;
      vm.hideMoney = false;
      var handle = userIdentity.handle;

      if ($stateParams.notifyReset) {
        NotificationService.inform('Thanks. Your new password has been set.');
      }

      displayMoneyEarned(handle);
    }

    function displayMoneyEarned(handle) {
      ProfileService.getUserFinancials(handle)
      .then(function(financials) {
        vm.moneyEarned = _.sum(_.pluck(financials, 'amount'));

        if (!vm.moneyEarned) {
          vm.hideMoney = true;
        }

        vm.loading = false;
      })
      .catch(function(err) {
        vm.hideMoney = true;
        vm.loading = false;
      });
    }
  }
})();
