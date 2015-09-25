(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('MyChallengesWidgetController', MyChallengesWidgetController);

  MyChallengesWidgetController.$inject = ['ChallengeService', 'UserService', '$log', 'CONSTANTS', 'userIdentity'];

  function MyChallengesWidgetController(ChallengeService, UserService, $log, CONSTANTS, userIdentity) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.loading = true;
    vm.myChallenges = [];
    vm.userHasChallenges = true;

    var handle = userIdentity.handle;

    activate();

    function activate() {
      viewActiveChallenges();
    }

    function viewActiveChallenges() {
      vm.myChallenges = [];
      getChallenges('active', 'submissionEndDate');
    }

    function getChallenges(status, orderBy) {
      var params = {
        limit: 8,
        offset: 0,
        orderBy: orderBy, // TODO verify if this is the correct sort order clause,
        filter: {
          status : status
        }
      };

      ChallengeService.getUserChallenges(handle, params)
      .then(function(challenges){
        ChallengeService.processActiveDevDesignChallenges(challenges);
        // console.log(challenges.plain());

        if (challenges.length > 0) {
          vm.myChallenges = challenges;
          vm.userHasChallenges = true;
          vm.loading = false;
        } else {
          vm.userHasChallenges = false;
          vm.loading = false;
        }
      })
      .catch(function(err) {
        $log.error(err);
        vm.userHasChallenges = true;
        vm.loading = false;
      });
    }
  }
})();
