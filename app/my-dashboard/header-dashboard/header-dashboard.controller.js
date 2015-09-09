(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('HeaderDashboardController', HeaderDashboardController);

  HeaderDashboardController.$inject = [
    '$stateParams',
    'NotificationService',
    'UserService',
    'ProfileService',
    'CONSTANTS'
  ];

  function HeaderDashboardController($stateParams, NotificationService, UserService, ProfileService, CONSTANTS) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.defaultPhotoUrl = CONSTANTS.ASSET_PREFIX + "images/avatarPlaceholder.png";
    vm.isCopilot = false;
    vm.loading = true;
    vm.hasRatings = true;
    vm.rankStats = [];

    if ($stateParams.notifyReset) {
      NotificationService.inform('Thanks. Your new password has been set.');
    }

    activate();

    function activate() {
      var handle = UserService.getUserIdentity().handle;

      ProfileService.getUserProfile(handle)
      .then(function(profile) {
        vm.profile = profile;
      });

      ProfileService.getUserStats(handle)
      .then(function(stats) {
        vm.rankStats = ProfileService.getRanks(stats);

        if (vm.rankStats.length === 0) {
          vm.hasRatings = false;
        }

        vm.loading = false;
      })
      .catch(function(err) {
        vm.hasRatings = false;
        vm.loading = false;
        // todo handle error
      })

      ProfileService.getUserFinancials(handle)
      .then(function(financials) {
        vm.moneyEarned = financials.overallEarning;
      });

      // Can this be deleted now?
      // TODO - challenges

      // Get active challenges in ordor to populate user's active challenges and review opportunities
      // ChallengeService.getMyActiveChallenges()
      // .then(function(data) {

      //   vm.myActiveChallenges = data;

      //   var ctOpenChallenges = 0;
      //   var ctReviewChallenges = 0;
      //   var ctCopilotChallenges = 0;

      //   angular.forEach(vm.myActiveChallenges, function(challenge) {
      //     if (!challenge.roles) {
      //       return;
      //     }
      //     angular.forEach(challenge.roles, function(role) {
      //       var r = role.toLowerCase();
      //       if(r == "submitter") {
      //         ctOpenChallenges++
      //       }
      //       if(r == "reviewer") {
      //         ctReviewChallenges++
      //       }
      //       if(r == "copilot") {
      //         ctCopilotChallenges++
      //       }
      //     });
      //   });

      //   vm.myOpenChallengesCount = ctOpenChallenges;
      //   vm.reviewOpportunities = ctReviewChallenges;
      //   vm.copilotChallengesCount = ctCopilotChallenges;
      // });
    }
  }
})();
