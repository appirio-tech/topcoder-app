import angular from 'angular'
import _ from 'lodash'

(function () {
  'use strict'

  angular.module('tcUIComponents').directive('pageStateHeader', function() {
    return {
      restrict: 'E',
      template: require('./page-state-header')(),
      transclude: true,
      scope: {
        handle: '@',
        pageTitle: '@',
        showBackLink: '=',
        hideMoney: '=',
        defaultState: '@'
      },
      controller: ['CONSTANTS', '$rootScope', '$scope', 'ProfileService', '$log', '$state', pageStateHeader],
      controllerAs: 'vm'
    }
  })

  function pageStateHeader(CONSTANTS, $rootScope, $scope, ProfileService, $log, $state) {
    var vm = this
    vm.backHandler = backHandler

    activate()

    // watch for profile update event in case handle/image are updated
    $rootScope.$on(CONSTANTS.EVENT_PROFILE_UPDATED, function() {
      activate()
    })

    function activate() {
      vm.handle = $scope.handle
      vm.profile = null
      vm.handleColor = null
      $scope.hideMoney = _.get($scope, 'hideMoney', true)
      vm.previousStateName = null
      vm.previousStateLabel = null
      vm.previousState = null
      vm.showBackLink = _.get($scope, 'showBackLink', false)
      vm.loading = true

      // identifies the previous state
      if ($scope.$root.previousState && $scope.$root.previousState.name.length > 0) {
        vm.previousState = $scope.$root.previousState
        vm.previousStateName = vm.previousState.name

      } else if ($scope.defaultState) {
        vm.previousStateName = $scope.defaultState
      }

      // sets the label of the link based on the state
      if (vm.previousStateName) {
        if (vm.previousStateName === 'dashboard') {
          vm.previousStateLabel = 'Dashboard'

        } else if (vm.previousStateName.indexOf('profile') > -1) {
          vm.previousStateLabel = 'Profile'
        }
      }

      // gets member's profile
      ProfileService.getUserProfile(vm.handle).then(function(profile) {
        vm.profile = profile
        vm.handleColor = ProfileService.getUserHandleColor(vm.profile)

        if (!$scope.hideMoney) {
          displayMoneyEarned(vm.handle)
        } else {
          vm.loading = false
        }
      })
    }

    function backHandler() {
      var _params = {}
      var _name = vm.previousStateName

      switch (vm.previousStateName) {
      case 'profile.about':
        _params = {userHandle: vm.profile.handle}
        break
      case 'dashboard':
      default:
        _name = 'dashboard'
        break
      }

      $state.go(_name, _params)
    }

    function displayMoneyEarned(handle) {
      ProfileService.getUserFinancials(handle)
      .then(function(financials) {
        vm.moneyEarned = _.sum(_.pluck(financials, 'amount'))

        if (!vm.moneyEarned) {
          $scope.hideMoney = true
        }

        vm.loading = false
      })
      .catch(function(err) {
        $scope.hideMoney = true
        vm.loading = false
      })
    }
  }
})()
