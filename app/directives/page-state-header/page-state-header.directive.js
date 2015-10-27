(function () {
  'use strict';

  angular.module('tcUIComponents').directive('pageStateHeader', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/page-state-header/page-state-header.directive.html',
      transclude: true,
      scope: {
        handle: '@',
        pageTitle: '@',
        showBackLink: '=',
        hideMoney: '=',
        defaultState: '@'
      },
      controller: ['$scope', 'NotificationService', 'ProfileService', '$log', '$state', pageStateHeader],
      controllerAs: "vm"
    };
  });

  function pageStateHeader($scope, NotificationService, ProfileService, $log, $state) {
    var vm = this;
    vm.handle = $scope.handle;
    vm.profile = null;
    vm.handleColor = null;
    vm.hideMoney = _.get($scope, 'hideMoney', true);
    vm.previousStateName = null;
    vm.previousStateLabel = null;
    vm.previousState = null;
    vm.showBackLink = _.get($scope, 'showBackLink', false);
    vm.backHandler = backHandler;
    activate();

    function activate() {
      vm.loading = true;

      // identifies the previous state
      if ($scope.$root.previousState && $scope.$root.previousState.name.length > 0) {
        console.log($scope.$root.previousState);
        vm.previousState = $scope.$root.previousState;
        vm.previousStateName = vm.previousState.name;
      } else if ($scope.defaultState) {
        vm.previousStateName = $scope.defaultState;
      }

      // sets the label of the link based on the state
      if (vm.previousStateName) {
        if (vm.previousStateName === 'dashboard') {
          vm.previousStateLabel = 'Dashboard';
        } else if (vm.previousStateName.indexOf('profile') > -1) {
          vm.previousStateLabel = 'Profile';
        }
      }

      // gets member's profile
      ProfileService.getUserProfile(vm.handle).then(function(profile) {
        vm.profile = profile;
        vm.handleColor = ProfileService.getUserHandleColor(vm.profile);
        if (!vm.hideMoney) {
          displayMoneyEarned(vm.handle);
        } else {
          vm.loading = false;
        }
      });
    }

    function backHandler() {
      var _params = {};
      var _name = vm.previousStateName;
      switch (vm.previousStateName) {
        case 'profile.about':
          _params = {userHandle: vm.profile.handle};
          break;
        case 'dashboard':
        default:
          _name = 'dashboard';
          break;
      }
      $state.go(_name, _params);
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
