(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('MyChallengesWidgetController', MyChallengesWidgetController);

  MyChallengesWidgetController.$inject = ['ChallengeService', 'UserService', '$log', 'CONSTANTS', 'userIdentity', '$q'];

  function MyChallengesWidgetController(ChallengeService, UserService, $log, CONSTANTS, userIdentity, $q) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.loading = true;
    vm.userHasChallenges = true;

    var handle = userIdentity.handle;

    activate();

    function activate() {
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

      $q.all([
        ChallengeService.getUserMarathonMatches(handle, params),
        ChallengeService.getUserChallenges(handle, params)
      ]).then(function(challenges){
        var marathonMatches = challenges[0];
        var devDesignChallenges = challenges[1];

        // console.log('MMs: ', marathonMatches.plain());
        // console.log('dev design challenges: ', devDesignChallenges.plain());

        if (!marathonMatches.length && !devDesignChallenges.length) {
          vm.userHasChallenges = false;
          vm.loading = false;

        } else {
          ChallengeService.processActiveDevDesignChallenges(devDesignChallenges);
          ChallengeService.processActiveMarathonMatches(marathonMatches);
          var userChallenges = marathonMatches.concat(devDesignChallenges);
          // sort by closest deadline .sort(function)
          // limit to 8 .slice(0, 8);

          vm.myChallenges = userChallenges;
          vm.userHasChallenges = true;
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
