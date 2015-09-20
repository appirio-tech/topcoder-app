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
    vm.loading = true;
    vm.challenges = [];
    vm.registerUser = registerUser;
    var userId = UserService.getUserIdentity().userId;

    activate();

    function activate() {
      MemberCertService.getMemberRegistration(userId, CONSTANTS.SWIFT_PROGRAM_ID)
      .then(function(res) {
        if (res == null) {
          vm.registered = false;
          vm.loading = false;
        } else {
          vm.registered = true;
          loadChallenges();
        }
      })
      .catch(function(err) {
        vm.registered = false;
        vm.loading = false;
        $log.debug(err);
      });
    }

    function registerUser() {
      vm.loading = true;
      return MemberCertService.registerMember(userId, CONSTANTS.SWIFT_PROGRAM_ID).then(function(data) {
        if (data && data.eventId && data.userId) {
          vm.registration = data;
          vm.registered = true;
          loadChallenges();
        } else {
          vm.loading = false;
        }
      });
    }

    function loadChallenges() {
      return ChallengeService.getiOSChallenges()
      .then(function(challenges) {
        // When filtering by reviewType is fixed on the backend,
        // we can show both types of challenges. For now, it's showing internal
        // challenges

        // var peerChallenges = challenges[0];
        // var iOSChallenges = challenges[1];
        // vm.challenges = [peerChallenges[0], iOSChallenges[0], iOSChallenges[1]];
        vm.challenges = challenges;
        vm.loading = false;
      })
      .catch(function(err) {
        vm.loading = false;
        $log.debug(err);
      });
    }
  }
})();
