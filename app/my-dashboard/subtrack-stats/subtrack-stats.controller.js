import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.myDashboard').controller('SubtrackStatsController', SubtrackStatsController)

  SubtrackStatsController.$inject = ['$filter', 'ProfileService', 'UserStatsService', 'userIdentity', 'logger']

  function SubtrackStatsController($filter, ProfileService, UserStatsService, userIdentity, logger) {
    var vm = this
    vm.loading = true

    activate()

    function activate() {
      vm.handle = userIdentity.handle

      ProfileService.getUserStats(vm.handle)
      .then(function(stats) {
        var trackRanks = ProfileService.getRanks(stats)
        var subtrackRanks = UserStatsService.compileSubtracks(trackRanks)

        UserStatsService.processStats(subtrackRanks)
        // filter stats based on processing done above
        // filtering is a separate step to allow multiple pre-processings and filter out in single call
        subtrackRanks = UserStatsService.filterStats(subtrackRanks)
        // sort subtrack ranks
        subtrackRanks = $filter('orderBy')(subtrackRanks, 'mostRecentSubmissionDate', true)

        vm.subtrackRanks = subtrackRanks
        vm.hasRanks = !!vm.subtrackRanks.length

        vm.loading = false
      })
      .catch(function(err) {
        vm.hasRanks = false
        vm.loading = false

        logger.error('Could not get user stats', err)
      })
    }
  }
})()
