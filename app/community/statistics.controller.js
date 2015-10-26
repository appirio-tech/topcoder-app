(function () {
  'use strict';

  angular.module('tc.community').controller('StatisticsController', StatisticsController);

  StatisticsController.$inject = ['statData', 'StatisticsService', 'CONSTANTS'];

  function StatisticsController(statData, StatisticsService, CONSTANTS) {
    var statsData = this;
    statsData.domain = CONSTANTS.domain;
    statsData.SRMWinners = statData.data.SRMWinners;
    statsData.MarathonWinner = statData.data.MarathonWinner;
    statsData.TopPerformers = [];

    StatisticsService.getDesignTop(10).then(function (data) {
      statsData.TopPerformers.push({
        "contestType": "Design",
        "class": "design",
        "dataType": "Wins",
        "performers": data.data.data
    });
    });

    StatisticsService.getDevTop(10).then(function (data) {
      statsData.TopPerformers.push({
        "contestType": "Development",
        "class": "develop",
        "dataType": "Rating",
        "performers": data.data.data
      });
    });

    StatisticsService.getDataTop(10).then(function (data) {
      statsData.TopPerformers.push({
        "contestType": "Competitive Programming",
        "class": "data-science",
        "dataType": "Rating",
        "performers": data.data.data
      });
    });
  }
})();
