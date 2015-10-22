(function () {
  'use strict';

  angular.module('tcUIComponents').directive('pageStateHeader', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/page-state-header/page-state-header.directive.html',
      scope: {
        handle: '@',
        pageTitle: '@'
      },
      controller: ['$scope', 'NotificationService', 'ProfileService', '$log', pageStateHeader],
      controllerAs: "vm"
    };
  });

  function pageStateHeader($scope, NotificationService, ProfileService, $log) {
    var vm = this;
    vm.handle = $scope.handle;
    vm.profile = null;
    vm.handleColor = null;


    activate();

    function activate() {
      vm.loading = true;
      vm.hideMoney = false;

      ProfileService.getUserProfile(vm.handle).then(function(profile) {
        vm.profile = profile;
        vm.handleColor = ProfileService.getUserHandleColor(vm.profile);

        displayMoneyEarned(vm.handle);
      });
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
