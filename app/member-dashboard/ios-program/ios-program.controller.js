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
        console.log('registered or not: ', res.plain());
        if (res !== undefined) {
          ChallengeService.getiOSChallenges()
          .then(function(challenges) {
            // var peerChallenges = challenges[0];
            // var iOSChallenges = challenges[1];
            // console.log(peerChallenges);
            // console.log('ios ', iOSChallenges);
            // vm.challenges = [peerChallenges[0], iOSChallenges[0], iOSChallenges[1]];
            vm.challenges = challenges;
            console.log(vm.challenges);
            vm.registered = true;
          })
          .catch(function(err) {
            vm.registered = true;
            $log.debug(err);
          });

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
