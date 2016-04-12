import angular from 'angular'
import _ from 'lodash'

(function () {
  'use strict'

  angular.module('tc.myChallenges').controller('MyChallengesController', MyChallengesController)

  MyChallengesController.$inject = ['ChallengeService', 'UserService', '$q', 'logger', '$state', 'CONSTANTS', 'Helpers', '$scope', 'userIdentity', '$stateParams']

  function MyChallengesController(ChallengeService, UserService, $q, logger, $state, CONSTANTS, Helpers, $scope, userIdentity, $stateParams) {
    var vm = this
    vm.domain = CONSTANTS.domain
    vm.neverParticipated = false
    vm.myChallenges = []
    vm.loading = CONSTANTS.STATE_LOADING
    vm.view = UserService.getPreference($state.$current.name+'.challengeListView') || 'tile'
    vm.changeView = changeView
    vm.changeFilter = changeFilter
    vm.loadMore = loadMore
    vm.getChallenges = getChallenges
    vm.totalCount = 0
    // this will help to keep track of pagination across individual api calls
    var counts = {
      devDesign: {total: 0, current: 0},
      mms: {total: 0, current: 0}
    }
    vm.statusFilter = _.get($stateParams, 'status','active')
    if (vm.statusFilter !== 'active' && vm.statusFilter !== 'completed') {
      logger.info('invalid filter, defaulting to active')
      vm.statusFilter = 'active'
    }
    vm.orderBy

    var currentOffset = 0
    vm.handle = userIdentity.handle

    activate()

    function activate() {
      vm.isCopilot = _.includes(userIdentity.roles, 'copilot')
      vm.myChallenges = []
      changeFilter(vm.statusFilter)
    }

    function changeView(view) {
      vm.view = view
      // update UserPreference
      UserService.setPreference($state.$current.name+'.challengeListView', view)
    }

    function changeFilter(filter) {
      // reset
      vm.myChallenges = []
      currentOffset = 0
      counts = {
        devDesign: {total: 0, current: 0},
        mms: {total: 0, current: 0}
      }
      vm.statusFilter = filter
      // update url but don't reload
      $state.go($state.$current.name, {status: filter}, {notify: false})
      vm.orderBy = vm.statusFilter === 'active' ? 'registrationEndDate' : 'submissionEndDate'
      vm.getChallenges(currentOffset, true)
    }


    function getChallenges(offset, force) {
      vm.loading = CONSTANTS.STATE_LOADING
      var promises = []

      if (force || counts.devDesign.current < counts.devDesign.total) {
        promises.push(getDevDesignChallenges(offset))
      }
      if (force || counts.mms.current < counts.mms.total) {
        promises.push(getMMS(offset))
      }

      $q.all(promises)
      .then(function(data) {
        // data should be an array of 2 objects each with it's own array (2D array with metadata)

        vm.totalCount = _.sum(_.map(data, 'metadata.totalCount'))
        vm.myChallenges = vm.myChallenges.concat(_.union(data[0], data[1]))
        if (vm.totalCount === 0) {
          _checkForParticipation().then(function() {
            vm.loading = CONSTANTS.STATE_READY
          })
        } else {
          vm.loading = CONSTANTS.STATE_READY
        }
      })
      .catch(function(err) {
        logger.error('Error getting all challenges', err)

        vm.loading = CONSTANTS.STATE_ERROR
      })
    }

    function getDevDesignChallenges(offset) {
      var params = {
        limit: 12,
        offset: offset,
        orderBy: vm.orderBy + ' desc',
        filter: 'status=' + vm.statusFilter
      }
      return ChallengeService.getUserChallenges(vm.handle, params).then(function(challenges) {
        if (vm.statusFilter == 'active') {
          ChallengeService.processActiveDevDesignChallenges(challenges)
        } else {
          ChallengeService.processPastChallenges(challenges)
        }
        // update counts
        counts.devDesign.total = challenges.metadata.totalCount
        counts.devDesign.current += challenges.length
        return challenges
      })
    }

    function getMMS(offset) {
      var _filter
      if (vm.statusFilter === 'active') {
        _filter = 'status=active'
      } else {
        _filter = 'status=past&isRatedForMM=true'
      }
      var params = {
        limit: 12,
        offset: offset,
        orderBy: vm.statusFilter === 'active' ? 'startDate' : 'endDate desc',
        filter: _filter
      }
      return ChallengeService.getUserMarathonMatches(vm.handle, params).then(function(marathonMatches) {
        if (vm.statusFilter === 'active') {
          ChallengeService.processActiveMarathonMatches(marathonMatches)
        }
        // update counts
        counts.mms.total = marathonMatches.metadata.totalCount
        counts.mms.current += marathonMatches.length
        return marathonMatches
      })
    }

    function loadMore() {
      currentOffset+=12
      vm.getChallenges(currentOffset, false)
    }

    function _checkForParticipation() {
      return ChallengeService.checkChallengeParticipation(vm.handle, function(participated) {
        vm.neverParticipated = !participated
      })
    }
  }
})()
