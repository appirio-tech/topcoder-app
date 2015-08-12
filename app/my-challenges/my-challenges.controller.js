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

    var userId = UserService.getUserIdentity().userId;

    activate();

    function activate() {
      viewActiveChallenges();
    }

    function viewActiveChallenges() {
      vm.myChallenges = [];
      getChallenges('Active', 'submissionEndDate asc');
    };

    function viewPastChallenges() {
      vm.myChallenges = [];
      getChallenges('Completed|Cancelled', 'submissionEndDate asc');
    };

    // get ACTIVE challenges and spotlight challenges
    function getChallenges(status, orderBy) {
      var params = {
        offset: 0,
        orderBy: orderBy, // TODO verify if this is the correct sort order clause,
        filter: "userId="+userId+"&status="+status
      };

      $q.all([
        ChallengeService.getChallenges(params),
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
