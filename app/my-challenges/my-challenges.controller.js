(function () {
  'use strict';

  angular.module('tc.myChallenges').controller('MyChallengesController', MyChallengesController);

  MyChallengesController.$inject = ['ChallengeService', 'UserService', '$q', '$log', 'CONSTANTS', 'Helpers', '$scope'];

  function MyChallengesController(ChallengeService, UserService, $q, $log, CONSTANTS, Helpers, $scope) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.loading = true;
    vm.myChallenges = [];
    vm.userHasChallenges = true;
    vm.viewActiveChallenges = viewActiveChallenges;
    vm.viewPastChallenges = viewPastChallenges;
    vm.view = 'list';
    vm.changeView = changeView;
    vm.statusFilter = 'active';
    vm.pageParams = {
      offset : 0,
      limit: 5,
      count: 0,
      totalCount: 0
    };
    vm.getChallenges = getChallenges;
    vm.orderBy = 'submissionEndDate';

    var userId = UserService.getUserIdentity().userId;
    var handle = UserService.getUserIdentity().handle;

    activate();

    function activate() {
      viewActiveChallenges();
    }

    function nextPage() {
      vm.offset += vm.limit;
      getChallenges();
    }

    function prevPage() {
      vm.offset -= vm.limit;
      getChallenges();
    }

    function changeView(view) {
      vm.view = view;
    }

    function viewActiveChallenges() {
      vm.myChallenges = [];
      vm.statusFilter = 'active';
      getChallenges();
    };

    function viewPastChallenges() {
      vm.myChallenges = [];
      vm.statusFilter = 'completed';
      getChallenges();
    };

    // get ACTIVE challenges and spotlight challenges
    function getChallenges() {
      var params = {
        limit: vm.pageParams.limit,
        offset: vm.pageParams.offset,
        orderBy: vm.orderBy, // TODO verify if this is the correct sort order clause,
        filter: {
          status : vm.statusFilter
        }
      };
      vm.loading = true;
      return $q.all([
        ChallengeService.getUserChallenges(handle, params),
        ChallengeService.getSpotlightChallenges()
      ])
      .then(function(data){
        var challenges = data[0];
        var spotlightChallenges = data[1];

        if (challenges.length > 0) {
          // FIXME until we figure out the correct sort order param

          vm.myChallenges = challenges;
          vm.spotlightChallenge = spotlightChallenges[0];

          vm.userHasChallenges = true;
          vm.loading = false;
        } else {
          vm.userHasChallenges = false;
          vm.spotlightChallenges = spotlightChallenges.slice(0, 2);
          vm.loading = false;
        }
      })
      .catch(function(err) {
        $log.error(err);
        vm.userHasChallenges = true;
        vm.loading = false;
        // TODO - handle error
      });
    }
  }
})();
