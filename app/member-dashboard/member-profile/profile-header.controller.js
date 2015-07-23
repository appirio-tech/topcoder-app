(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('Dashboard.ProfileHeaderController', ProfileHeaderController);

  ProfileHeaderController.$inject = [
    '$scope',
    '$location',
    'UserService',
    'ProfileService',
    'ChallengeService',
    'CONSTANTS'
  ];

  function ProfileHeaderController($scope, $location, UserService, ProfileService, ChallengeService, CONSTANTS) {
    var vm = this;
    vm.communityBaseUrl = $location.protocol() + ":" + CONSTANTS.COMMUNITY_URL;
    // edit profile url
    vm.editProfileUrl = vm.communityBaseUrl + '/tc?module=MyHome';
    vm.defaultPhotoUrl = "/images/avatarPlaceholder.png";
    vm.statsToShow = 2;

    // activate controller
    function activate() {
      var userId = UserService.getUserIdentity().userId;
      ProfileService.getUserProfile(userId).then(function(profile) {
        vm.profile = profile;
      });

      ProfileService.getUserStats(userId).then(function(stats) {
        var ratingSummary = [];
        if (stats.developStats && stats.developStats.rankStats) {
          ratingSummary = ratingSummary.concat(stats.developStats.rankStats);
        }
        if (stats.designStats && stats.designStats.rankStats) {
          ratingSummary = ratingSummary.concat(stats.designStats.rankStats);
        }
        vm.ratingSummary = ratingSummary;
      });

      ProfileService.getUserFinancials(userId).then(function(financials) {
        vm.moneyEarned = financials.amount.toFixed(2);
      });

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

    activate();
  }
})();
