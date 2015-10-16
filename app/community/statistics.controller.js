(function() {
  'use strict';

  angular.module('tc.community').controller('StatisticsController', StatisticsController);

  StatisticsController.$inject = ['statData'];

  function StatisticsController(statData) {
    this.SRMWinners = statData.data.SRMWinners;
    this.MarathonWinner = statData.data.MarathonWinner;
    this.TopPerformers = statData.data.TopPerformers;
  }
})();