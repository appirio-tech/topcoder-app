(function() {
  'use strict';

  angular.module('tc.myDashboard').controller('ProgramsController', ProgramsController);

  ProgramsController.$inject = [
    'UserService',
    'MemberCertService',
    'CONSTANTS',
    '$log',
    'ChallengeService'
  ];

  function ProgramsController (UserService, MemberCertService, CONSTANTS, $log, ChallengeService) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.registered = false;

    activate();

    function activate() {
      var userId = UserService.getUserIdentity().userId;

      MemberCertService.getMemberRegistration(userId, CONSTANTS.SWIFT_PROGRAM_ID)
      .then(function(res) {
        if (res !== undefined) {
          ChallengeService.getiOSChallenges()
          .then(function(challenges) {
            // When filtering by reviewType is fixed on the backend,
            // we can show both types of challenges. For now, it's showing internal
            // challenges

            // var peerChallenges = challenges[0];
            // var iOSChallenges = challenges[1];
            // vm.challenges = [peerChallenges[0], iOSChallenges[0], iOSChallenges[1]];
            vm.challenges = challenges;
            console.log(vm.challenges);
            vm.registered = true;
          })
          .catch(function(err) {
            vm.registered = true;
            $log.debug(err);
          });
        }
      })
      .catch(function(err) {
        vm.registered = false;
        $log.debug(err);
      });
    }
  }
})();
