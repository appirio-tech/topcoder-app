(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('HeaderDashboardController', HeaderDashboardController);

  HeaderDashboardController.$inject = [
    'UserService',
    'ProfileService',
    'CONSTANTS'
  ];

  function HeaderDashboardController(UserService, ProfileService, CONSTANTS) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.defaultPhotoUrl = "/images/avatarPlaceholder.png";
    vm.isCopilot = true;

    activate();

    function activate() {
      var userId = UserService.getUserIdentity().userId;

      ProfileService.getUserProfile(userId)
      .then(function(profile) {
        console.log("profile: ", profile);
        vm.profile = profile;
      });

      ProfileService.getUserStats(userId)
      .then(function(stats) {
        var trackRatings = [];

        if (stats.developStats && stats.developStats.rankStats) {
          trackRatings = trackRatings.concat(stats.developStats.rankStats);
        }

        if (stats.designStats && stats.designStats.rankStats) {
          trackRatings = trackRatings.concat(stats.designStats.rankStats);
        }

        angular.forEach(trackRatings, function(track){
          if (track.phaseDesc === "Assembly Competition") {
            track.phaseDesc = "Assembly"
          }
        })

        vm.trackRatings = trackRatings;

      });

      ProfileService.getUserFinancials(userId)
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
