(function () {
  'use strict';

  angular.module('tc.community').controller('StatisticsController', StatisticsController);

  StatisticsController.$inject = ['statData', 'StatisticsService'];

  function StatisticsController(statData, StatisticsService) {
    var stasData = this;
    stasData.SRMWinners = statData.data.SRMWinners;
    stasData.MarathonWinner = statData.data.MarathonWinner;
    stasData.TopPerformers = [];

    StatisticsService.getDesignTop(10).then(function (data) {
      stasData.TopPerformers.push({
        "contestType": "Design",
        "class": "design",
        "dataType": "Wins",
        "performers": data.data.data
    });
    });

    StatisticsService.getDevTop(10).then(function (data) {
      stasData.TopPerformers.push({
        "contestType": "Development",
        "class": "develop",
        "dataType": "Rating",
        "performers": data.data.data
      });
    });

    StatisticsService.getDataTop(10).then(function (data) {
      stasData.TopPerformers.push({
        "contestType": "Data Science",
        "class": "data-science",
        "dataType": "Rating",
        "performers": data.data.data
      });
    });
  }
})();
