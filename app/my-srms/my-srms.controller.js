(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('MySRMsController', MySRMsController);

  MySRMsController.$inject = ['UserService','SRMService', '$log', '$state', '$stateParams', 'CONSTANTS', '$scope'];

  function MySRMsController(UserService, SRMService, $log, $state, $stateParams, CONSTANTS, $scope) {
    $log = $log.getInstance('MySRMsController');
    var vm = this;
    vm.srms = [];
    vm.statusFilter = _.get($stateParams, 'status','past');

    vm.loading = CONSTANTS.STATE_LOADING;
    vm.view = UserService.getPreference($state.$current.name+'.challengeListView') || 'tile';
    vm.changeView = changeView;
    vm.changeFilter = changeFilter;
    vm.getSRMs = getSRMs;
    // paging params, these are updated by tc-pager
    vm.pageParams = {
      currentOffset : 0,
      limit: 16,
      currentCount: 0,
      totalCount: 0,
      // counter used to indicate page change
      updated: 0
    };

    var userId = UserService.getUserIdentity().userId;
    var userHandle = UserService.getUserIdentity().handle;

    activate();

    function activate() {
      vm.srms = [];
      // watches page change counter to reload the data
      $scope.$watch('vm.pageParams.updated', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          getSRMs();
        }
      });
      // initial call
      changeFilter(vm.statusFilter);
    }

    function changeView(view) {
      vm.view = view;
      // update UserPreference
      UserService.setPreference($state.$current.name+'.challengeListView', view);
    }

    function changeFilter(filter) {
      vm.statusFilter = filter;
      vm.orderBy = filter === 'future'? 'startDate': 'endDate';
      vm.reverseOrder = filter !== 'future';
      // update url but don't reload
      $state.go($state.$current.name, {status: filter}, {notify: false});
      // reset
      vm.srms = [];
      vm.pageParams.currentOffset = 0;
      getSRMs();
    }

    function getSRMs() {
      vm.loading = CONSTANTS.STATE_LOADING;

      // reverseOrder implies we need to send 'desc' in orderBy clause.
      var _orderByString = vm.orderBy;
      if (vm.reverseOrder)
        _orderByString += ' desc';
      var params = {
        limit: vm.pageParams.limit,
        orderBy: _orderByString,
        offset: vm.pageParams.currentOffset,
        filter: 'status=' + vm.statusFilter
      };

      if (vm.statusFilter === 'past') {
        return SRMService.getPastSRMs(userHandle, params)
          .then(handleSRMsLoad, handleSRMsFailure);
      } else {
        return SRMService.getSRMs(params)
        .then(handleSRMsLoad, handleSRMsFailure);
      }
    }

    function handleSRMsLoad(data) {
      vm.pageParams.totalCount = data.metadata.totalCount;
      vm.srms = vm.srms.concat(data);
      vm.pageParams.currentCount = vm.srms.length;
      vm.loading = CONSTANTS.STATE_READY;
    }

    function handleSRMsFailure(resp) {
      $log.error(resp);
      vm.loading = CONSTANTS.STATE_ERROR;
    }
  }
})();
