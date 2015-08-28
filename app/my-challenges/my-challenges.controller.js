(function () {
  'use strict';

  angular.module('tc.myChallenges').controller('MyChallengesController', MyChallengesController);

  MyChallengesController.$inject = ['ChallengeService', 'UserService', '$q', '$log', 'CONSTANTS', 'Helpers'];

  function MyChallengesController(ChallengeService, UserService, $q, $log, CONSTANTS, Helpers) {
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
    vm.offset = 0;
    // maximum number of challenges to be shown on the page
    vm.limit = 5;
    // actual number of challenges shown on the page
    vm.count = 0;
    // total number of challenges available for the current filters
    vm.totalCount = 0;
    vm.nextPage = nextPage;
    vm.prevPage = prevPage;
    // flag holding the state of visibility of next pager
    vm.nextPageAvailable = false;
    // flag holding the state of visibility of previous pager
    vm.prevPageAvailable = false;

    var userId = UserService.getUserIdentity().userId;
    var handle = UserService.getUserIdentity().handle;

    activate();

    function activate() {
      viewActiveChallenges();
    }

    function nextPage() {
      vm.offset += vm.limit;
      getChallenges('submissionEndDate');
    }

    function prevPage() {
      vm.offset -= vm.limit;
      getChallenges('submissionEndDate');
    }

    function changeView(view) {
      vm.view = view;
    }

    function viewActiveChallenges() {
      vm.myChallenges = [];
      vm.statusFilter = 'active';
      getChallenges('submissionEndDate');
    };

    function viewPastChallenges() {
      vm.myChallenges = [];
      vm.statusFilter = 'completed';
      getChallenges('submissionEndDate');
    };

    /**
     * Helper method to validate the pager state.
     */
    function _validatePager() {
      if (vm.count + vm.offset >= vm.totalCount) {
        vm.nextPageAvailable = false;
      } else {
        vm.nextPageAvailable = true;
      }
      if (vm.offset <= 0) {
        vm.prevPageAvailable = false;
      } else {
        vm.prevPageAvailable = true;
      }
    }

    // get ACTIVE challenges and spotlight challenges
    function getChallenges(orderBy) {
      var params = {
        limit: vm.limit,
        offset: vm.offset,
        orderBy: orderBy, // TODO verify if this is the correct sort order clause,
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
          vm.count = challenges.length;
          vm.totalCount = challenges.metadata.totalCount;
          _validatePager();
          vm.spotlightChallenge = spotlightChallenges[0];

          vm.userHasChallenges = true;
          vm.loading = false;
        } else {
          vm.count = 0;
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
