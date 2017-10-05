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
      controller: ['CONSTANTS', '$rootScope', '$scope', 'ProfileService', 'logger', '$state', 'ChallengeService', '$q', 'UserService', 'BadgeService', pageStateHeader],
      controllerAs: 'vm'
    }
  })

  function pageStateHeader(CONSTANTS, $rootScope, $scope, ProfileService, logger, $state, ChallengeService, $q, UserService, BadgeService) {
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
      $scope.hideMoney = _.get($scope, 'hideMoney', true)
      vm.previousStateName = null
      vm.previousStateLabel = null
      vm.previousState = null
      vm.dashboardBadgeName = null
      

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
        // get members dashboard badge
        UserService.getV2UserProfile(vm.handle).then(function(resp) {
          vm.dashboardAchievement = _filterDashboardAchievement(resp.Achievements || [])[0]
        })
      })

      // get member's challenges to display number of active challenges
      $q.all([
        ChallengeService.getUserMarathonMatches(vm.handle, { filter: 'status=active' }),
        ChallengeService.getUserChallenges(vm.handle, { filter: 'status=active' })
      ]).then(function(challenges){
        var marathonMatches = challenges[0]
        var devDesignChallenges = challenges[1]
        
        vm.activeChallenges = marathonMatches.length + devDesignChallenges.length

      })

      displayMoneyEarned(vm.handle)

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
        vm.moneyEarned = _.sum(_.map(financials, 'amount'))

        if (!vm.moneyEarned) {
          $scope.hideMoney = true
        }
      })
      .catch(function(err) {
        $scope.hideMoney = true
        logger.error('Could not get user financial information', err)
      })
    }
        
    function _filterDashboardAchievement(achievements) {      
      //Currently only one batch is shown on the dashboard
      vm.dashboardBadgeName = 'SRM Engagement Honor'

      return achievements.filter(function(achievement) {
        return (achievement.description === vm.dashboardBadgeName)
      })
    }
  }
})()
