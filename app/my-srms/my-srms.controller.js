import angular from 'angular'
import _ from 'lodash'

(function () {
  'use strict'

  angular.module('tc.myDashboard').controller('MySRMsController', MySRMsController)

  MySRMsController.$inject = ['UserService','SRMService', '$log', 'logger', '$state', '$stateParams', 'CONSTANTS', '$scope']

  function MySRMsController(UserService, SRMService, $log, logger, $state, $stateParams, CONSTANTS, $scope) {
    $log = $log.getInstance('MySRMsController')
    var vm = this
    vm.srms = []
    vm.statusFilter = _.get($stateParams, 'status','past')

    vm.loading = CONSTANTS.STATE_LOADING
    vm.view = UserService.getPreference($state.$current.name+'.challengeListView') || 'tile'
    vm.changeView = changeView
    vm.changeFilter = changeFilter
    vm.getSRMs = getSRMs
    // paging params, these are updated by tc-pager
    vm.pageParams = {
      currentOffset : 0,
      limit: 16,
      currentCount: 0,
      totalCount: 0,
      // counter used to indicate page change
      updated: 0
    }

    var userId = UserService.getUserIdentity().userId
    var userHandle = UserService.getUserIdentity().handle
    vm.userId = userId
    vm.handle = userHandle

    activate()

    function activate() {
      vm.srms = []
      // watches page change counter to reload the data
      $scope.$watch('vm.pageParams.updated', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          getSRMs()
        }
      })
      // initial call
      changeFilter(vm.statusFilter)
    }

    function changeView(view) {
      vm.view = view
      // update UserPreference
      UserService.setPreference($state.$current.name+'.challengeListView', view)
    }

    function changeFilter(filter) {
      vm.statusFilter = filter
      // for upcoming SRMs sorting is done ascending order of codingStartAt
      // for past SRMs sorting is done descending order of codingEndAt
      vm.orderBy = filter === 'future'? 'codingStartAt': 'codingEndAt'
      vm.reverseOrder = filter !== 'future'
      // update url but don't reload
      $state.go($state.$current.name, {status: filter}, {notify: false})
      // reset
      vm.srms = []
      vm.pageParams.currentOffset = 0
      getSRMs()
    }

    function getSRMs() {
      vm.loading = CONSTANTS.STATE_LOADING

      // reverseOrder implies we need to send 'desc' in orderBy clause.
      var _orderByString = vm.orderBy
      if (vm.reverseOrder)
        _orderByString += ' desc'
      var params = {
        limit: vm.pageParams.limit,
        orderBy: _orderByString,
        offset: vm.pageParams.currentOffset,
        filter: 'status=' + vm.statusFilter
      }

      return SRMService.getUserSRMs(userHandle, params)
        .then(handleSRMsLoad, handleSRMsFailure)
    }

    function handleSRMsLoad(data) {
      vm.pageParams.totalCount = data.metadata.totalCount
      vm.srms = vm.srms.concat(data)
      vm.pageParams.currentCount = vm.srms.length
      vm.loading = CONSTANTS.STATE_READY
    }

    function handleSRMsFailure(err) {
      logger.error('Could not get user SRMs', err)
      vm.loading = CONSTANTS.STATE_ERROR
    }
  }
})()
