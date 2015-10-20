(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('MySRMsController', MySRMsController);

  MySRMsController.$inject = ['UserService','SRMService', '$log', '$state', '$stateParams', 'CONSTANTS'];

  function MySRMsController(UserService, SRMService, $log, $state, $stateParams, CONSTANTS) {
    $log = $log.getInstance('MySRMsController');
    var vm = this;
    vm.srms = [];
    vm.statusFilter = _.get($stateParams, 'status','past');

    vm.loading = CONSTANTS.STATE_LOADING;
    vm.view = UserService.getPreference($state.$current.name+'.challengeListView') || 'tile';
    vm.changeView = changeView;
    vm.changeFilter = changeFilter;
    vm.loadMore = loadMore;
    vm.totalCount = 0;
    vm.getSRMs = getSRMs;
    var currentOffset = 0;
    var defaultParams = {
      orderBy: '',
      limit: 12
    };

    var userId = UserService.getUserIdentity().userId;
    var userHandle = UserService.getUserIdentity().handle;

    activate();

    function activate() {
      vm.srms = [];
      changeFilter(vm.statusFilter);
    }

    function changeView(view) {
      vm.view = view;
      // update UserPreference
      UserService.setPreference($state.$current.name+'.challengeListView', view);
    }

    function changeFilter(filter) {
      currentOffset = 0;
      vm.statusFilter = filter;
      vm.orderBy = filter === 'future'? 'startDate': 'endDate';
      vm.reverseOrder = filter !== 'future';
      // update url but don't reload
      $state.go($state.$current.name, {status: filter}, {notify: false});
      getSRMs(0);
    }

    function getSRMs(offset) {
      vm.loading = CONSTANTS.STATE_LOADING;
      if (!offset) {
        // reset
        offset = 0;
        vm.srms = [];
      }
      // reverseOrder implies we need to send 'desc' in orderBy clause.
      var _filterString = 'status=' + vm.statusFilter;
      if (vm.reverseOrder)
        _filterString += ' desc';
      var params = {
        limit: defaultParams.limit,
        orderBy: vm.orderBy,
        offset: offset,
        filter: _filterString
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
      vm.srms = vm.srms.concat(data);
      vm.loading = CONSTANTS.STATE_READY;
      vm.totalCount = data.metadata.totalCount;
    }

    function handleSRMsFailure(resp) {
      $log.error(resp);
      vm.loading = CONSTANTS.STATE_ERROR;
    }

    function loadMore() {
      currentOffset+=1;
      getSRMs(currentOffset);
    }

  }
})();
