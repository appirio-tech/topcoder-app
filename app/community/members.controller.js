import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.community').controller('MembersController', MembersController)

  MembersController.$inject = ['CommunityDataService', 'StatisticsService', 'CONSTANTS']

  function MembersController(CommunityDataService, StatisticsService, CONSTANTS) {
    var ctrl = this
    ctrl.notSearch = true
    ctrl.showing = 'list'
    ctrl.domain = CONSTANTS.domain
    ctrl.currentMonth = 'April 2016'
    ctrl.memberLeaderboard = []
    ctrl.copilots = []
    CommunityDataService.getMembersData()
      .then(function(data) {
        ctrl.memberLeaderboard = data.memberLeaderboard
        ctrl.copilots = data.copilots
      })

    ctrl.search = function() {
      if (ctrl.keywords) {
        window.location.replace('/search/members/?q=' + window.encodeURIComponent(ctrl.keywords))
      } else {
        ctrl.notSearch = true
      }
    }

    StatisticsService.getPlatformStats().then(function(data) {
      ctrl.platformStats = data
    })
  }

})()
