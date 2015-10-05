(function() {
  'use strict';

  angular.module('tc.myDashboard').controller('ProgramsController', ProgramsController);

  ProgramsController.$inject = [
    'UserService',
    'MemberCertService',
    'CONSTANTS',
    '$log',
    'ChallengeService',
    '$q'
  ];

  function ProgramsController (UserService, MemberCertService, CONSTANTS, $log, ChallengeService, $q) {
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
      var challengePromises = [
        ChallengeService.getChallenges({
          filter: "reviewType=peer&status=active",
          limit: 3,
          offset: 0,
          orderBy: 'submissionEndDate'
        }),
        ChallengeService.getChallenges({
          filter: "technologies=ios,swift&status=active",
          limit: 3,
          offset: 0,
          orderBy: 'submissionEndDate'
        })
      ];

      return $q.all(challengePromises)
      .then(function(challenges) {
        var peerChallenges = challenges[0];
        var iOSChallenges = challenges[1];
        var challenges = [];

        if (peerChallenges.length === 0) {
          challenges = challenges.concat(iOSChallenges);
        } else if (peerChallenges.length > 0) {
          challenges = challenges.concat(peerChallenges[0]).concat(iOSChallenges.slice(0, iOSChallenges.length - 1));
        }

        vm.challenges = challenges;
        ChallengeService.processActiveDevDesignChallenges(vm.challenges);
        vm.loading = false;
      })
      .catch(function(err) {
        vm.loading = false;
        $log.debug(err);
      });
    }
  }
})();
