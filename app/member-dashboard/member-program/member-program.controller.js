/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 * @author mdesiderio
 * @author vikas.agarwal@appirio.com
 * @version 1.0
 *
 * Controller for the member program widget
 */
(function () {

  /**
   * Create member program widget
   */
  angular
    .module('tc.myDashboard')
    .controller('MemberProgramCtrl', MemberProgramCtrl);

  /**
   * Inject dependencies
   * @type {string[]}
   */
  MemberProgramCtrl.$inject = ['$scope', '$q', 'tcAuth', 'memberCert', 'userService' , 'CONSTANTS'];

  /**
   * Controller implementation
   *
   * @param $scope
   * @constructor
   */
  function MemberProgramCtrl($scope, $q, tcAuth, MemberCertService, userService, CONSTANTS) {
    var vm = this;
    vm.title = 'iOS Developer Community';
    vm.user = null;
    vm.loading = true;
    vm.loadingMessage = "";
    vm.programUrl = CONSTANTS.SWIFT_PROGRAM_URL;
    vm.badges = [
      { id : 'participant', enabled : true, completed: true, name: 'Participant'},
      { id : 'education', enabled : false, completed: false, name: 'Education'},
      { id : 'peer', enabled : true, completed: false, name: 'Skills'},
      { id : 'challenge', enabled : false, completed: false, name: 'Challenge'},
      { id : 'high-performer', enabled : false, completed: false, name: 'High Performer'}
    ]
    vm.program = null;
    vm.registration = null;
    vm.registerUser = registerUser;

    // parent dashboard controller
    var db = $scope.$parent.db;

    // activate controller
    if (tcAuth.isAuthenticated() === true) {
      db.addIdentityChangeListener("memberprogram", function(identity) {
        activate(identity);
      });
      if (db.user) {
        activate(db.user);
      }
    } else {
      return false;
    }

    function activate(user) {
      vm.loading = true;
      vm.loadingMessage = "Checking your program status";
      vm.user = user;

      userService.getUsername().then(function(response) {
        var identity = response.data;
        var promises = [
          MemberCertService.getMemberRegistration(identity.uid, CONSTANTS.SWIFT_PROGRAM_ID),
          MemberCertService.peerBadgeCompleted(CONSTANTS.SWIFT_PROGRAM_ID)
        ]
        // gets member's registration status for the event
        return $q.all(promises).then(function(data) {
          var regResult = data.length > 0 ? data[0].result : null;
          var reg = regResult ? regResult.content : null;
          var peerBadgeResult = data.length > 1 ? data[1].result : null;
          if (reg) {
            vm.registration = reg;
            peerBadgeCompleted = peerBadgeResult ? peerBadgeResult.content : false;
            // peer badge is at 2 index in the array
            vm.badges[2].completed = peerBadgeCompleted;
          } else {
            vm.registration = null;
          }
          vm.loading = false;
        });
      });
    }

    function registerUser() {
      vm.loading = true;
      vm.loadingMessage = "Registering for the program";
      return MemberCertService.registerMember(vm.user.uid, CONSTANTS.SWIFT_PROGRAM_ID).then(function(data) {
        var result = data.result;
        var content = result ? result.content : null;
        if (content) {
          vm.registration = content;
        }
        vm.loading = false;
      });
    }
  }


})();
