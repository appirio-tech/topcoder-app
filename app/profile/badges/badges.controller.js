import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.profile').controller('BadgesController', BadgeCtrl)

  BadgeCtrl.$inject = ['$scope', 'UserService', 'userHandle', 'profile', 'BadgeService']

  // The controller for badges section of member-profile page.
  function BadgeCtrl($scope, UserService, userHandle, profile, BadgeService) {
    $scope.achievements = profile.badges.Achievements || []
    var badgeCtrl = this

    // Use logged in user's handle for showing badges if not injected into the controller
    badgeCtrl.userHandle = userHandle ? userHandle : UserService.getUserIdentity().username
    badgeCtrl.profile = profile

    var achievementsVm = BadgeService.buildAllAchievementsVm($scope.achievements)
    badgeCtrl.achievementGroups = achievementsVm.achievementGroups
    badgeCtrl.singleAchievements = achievementsVm.singleAchievements
  }

})()
