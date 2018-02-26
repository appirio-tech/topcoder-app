import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.profile').controller('BadgesController', BadgeCtrl)

  BadgeCtrl.$inject = ['$scope', 'UserService', 'userHandle', 'profile', 'BadgeService']

  // The controller for badges section of member-profile page.
  function BadgeCtrl($scope, UserService, userHandle, profile, BadgeService) {
    $scope.achievements = [{
date: "2017-08-01T00:00:00.000-04:00",
description: "TCO17 Finalist"
},{
date: "2017-08-01T00:00:00.000-04:00",
description: "TCO17 Champion"
}] || profile.badges.Achievements || []
    var badgeCtrl = this

    // Use logged in user's handle for showing badges if not injected into the controller
    badgeCtrl.userHandle = userHandle ? userHandle : UserService.getUserIdentity().username
    badgeCtrl.profile = profile

    var achievementsVm = BadgeService.buildAllAchievementsVm($scope.achievements)
    console.log(achievementsVm)
    badgeCtrl.achievementGroups = achievementsVm.achievementGroups

    //Dashboard badges shoudn't be displyed on public profile page
    badgeCtrl.singleAchievements = removeDashBoardAchivements(achievementsVm.singleAchievements)
  }

  function removeDashBoardAchivements(singleAchievements){
    var dashboardBadgeName = 'SRM Engagement Honor'
    return singleAchievements.filter(function(achievement){
      return (achievement.name != dashboardBadgeName)
    })
  }

})()
