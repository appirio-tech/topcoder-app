import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.community').controller('StatisticsController', StatisticsController)

  StatisticsController.$inject = ['CommunityDataService', 'StatisticsService', 'CONSTANTS']

  function StatisticsController(CommunityDataService, StatisticsService, CONSTANTS) {
    var statsData = this
    statsData.domain = CONSTANTS.domain
    statsData.SRMWinners = []
    statsData.MarathonWinner = []
    statsData.TopPerformers = []

    CommunityDataService.getStatisticsData()
      .then(function(data) {
        statsData.SRMWinners = data.SRMWinners
        statsData.MarathonWinner = data.MarathonWinner
      })

    StatisticsService.getDesignTop(10).then(function(data) {
      statsData.TopPerformers.push({
        'contestType': 'Design',
        'class': 'design',
        'dataType': 'Wins',
        'performers': data.plain().data
      })
    })

    StatisticsService.getDevTop(10).then(function(data) {
      statsData.TopPerformers.push({
        'contestType': 'Development',
        'class': 'develop',
        'dataType': 'Rating',
        'performers': data.plain().data
      })
    })

    StatisticsService.getDataTop(10).then(function(data) {
      statsData.TopPerformers.push({
        'contestType': 'Competitive Programming',
        'class': 'data-science',
        'dataType': 'Rating',
        'performers': data.plain().data
      })
    })
  }
})()
