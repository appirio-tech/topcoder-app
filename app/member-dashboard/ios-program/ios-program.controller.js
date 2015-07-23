(function() {
  'use strict';

  angular.module('tc.myDashboard').controller('iOSProgramController', iOSProgramController);

  iOSProgramController.$inject = [
    'UserService',
    'MemberCertService',
    'CONSTANTS',
    '$log',
    'ChallengeService'
  ];

  function iOSProgramController (UserService, MemberCertService, CONSTANTS, $log, ChallengeService) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.registered = false;

    activate();

    function activate() {
      var userId = UserService.getUserIdentity().userId;

      MemberCertService.getMemberRegistration(userId, CONSTANTS.SWIFT_PROGRAM_ID)
      .then(function(res) {
        if (res.result.content !== null) {
          // Mock
          vm.challenges = ChallengeService.getChallenges();
          vm.registered = true;

          // V2
          // ChallengeService.getChallenges({review: 'PEER'})
          // .then(function(response) {
          //   var peerChallenges = response.data.data.slice(0, 1);
          //   var numPeerChallenges = peerChallenges.length;

          //   ChallengeService.getChallenges({review: 'COMMUNITY,INTERNAL'})
          //   .then(function(response) {
          //     var nonPeerChallenges = response.data.data.slice(0, 3);

          //     if (numPeerChallenges === 1) {
          //       vm.challenges = peerChallenges.concat(nonPeerChallenges.slice(0, 2));

          //     } else if (numPeerChallenges === 0) {
          //       vm.challenges = nonPeerChallenges;
          //     }

          //     Helpers.formatArray(vm.challenges);

          //     for (var i = 0; i < vm.challenges.length; i++) {
          //       var challenge = vm.challenges[i];
          //       Helpers.processChallenge(challenge);
          //     }

          //     vm.registered = true;
          //   });
          // });
        }
      })
      .catch(function(err) {
        vm.registered = false;
        $log.debug(err);
      });
    }
  }
})();
