(function () {
  'use strict';

  angular.module('tc.myChallenges').controller('MyChallengesController', MyChallengesController);

  MyChallengesController.$inject = ['ChallengeService', 'UserService', '$q', '$log', '$state', 'CONSTANTS', 'Helpers', '$scope', 'userIdentity', '$stateParams'];

  function MyChallengesController(ChallengeService, UserService, $q, $log, $state, CONSTANTS, Helpers, $scope, userIdentity, $stateParams) {
    $log = $log.getInstance('MyChallengesController');
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.myChallenges = [];
    vm.loading = CONSTANTS.STATE_LOADING;
    vm.view = UserService.getPreference($state.$current.name+'.challengeListView') || 'tile';
    vm.changeView = changeView;
    vm.changeFilter = changeFilter;
    vm.loadMore = loadMore;
    vm.getChallenges = getChallenges;
    vm.totalCount = 0;
    vm.statusFilter = _.get($stateParams, 'status','active');
    if (vm.statusFilter !== 'active' && vm.statusFilter !== 'completed') {
      $log.error('invalid filter, defaulting to active');
      vm.statusFilter = 'active';
    }
    vm.orderBy;

    var currentOffset = 0;
    var defaultParams = {
      orderBy: 'submissionEndDate',
      limit: 10
    };

    var userId = userIdentity.userId;
    var handle = userIdentity.handle;

    activate();

    function activate() {
      vm.isCopilot = _.includes(userIdentity.roles, 'copilot');
      vm.myChallenges = [];
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
      vm.orderBy = vm.statusFilter === 'active' ? 'registrationEndDate' : 'submissionEndDate';
      vm.getChallenges(currentOffset);
    }

    function getChallenges(offset) {
      vm.loading = CONSTANTS.STATE_LOADING;
      if (!offset) {
        // reset
        offset = 0;
        vm.myChallenges = [];
      }

      var params = {
        limit: defaultParams.limit,
        offset: offset,
        orderBy: vm.orderBy + ' desc',
        filter: "status=" + vm.statusFilter
      };

      return ChallengeService.getUserChallenges(handle, params)
      .then(function(challenges) {
        if (vm.statusFilter == 'active') {
          ChallengeService.processActiveDevDesignChallenges(challenges);
        } else {
          ChallengeService.processPastChallenges(challenges);
        }
        vm.myChallenges = vm.myChallenges.concat(challenges);
        vm.totalCount = challenges.metadata.totalCount;
        vm.loading = CONSTANTS.STATE_READY;
      })
      .catch(function(err) {
        vm.loading = CONSTANTS.STATE_ERROR;
        $log.error(err);
      });
    }

    function loadMore() {
      currentOffset+=1;
      vm.getChallenges(currentOffset);
    }
  }
})();
