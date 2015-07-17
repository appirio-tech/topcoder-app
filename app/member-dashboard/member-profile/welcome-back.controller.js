(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('WelcomeBackController', WelcomeBackController);

  WelcomeBackController.$inject = [
    '$scope',
    '$location',
    'TcAuthService',
    'ProfileService',
    'ChallengeService',
    'CONSTANTS'
  ];

  function WelcomeBackController($scope, $location, TcAuthService, ProfileService, ChallengeService, CONSTANTS) {
    var vm = this;
    vm.communityBaseUrl = $location.protocol() + ":" + CONSTANTS.COMMUNITY_URL;
    // edit profile url
    vm.editProfileUrl = vm.communityBaseUrl + '/tc?module=MyHome';
    // default rating collor
    vm.ratingColor = "color: #999999";
    // flag to determine visibility of upload photo link
    vm.showUploadPhotoLink = false;
    // url for the upload photo link
    vm.uploadPhotoLink = null;
    // count of member stats/metrices to be shown in profile header
    vm.statsToShow = 2;

    // parent dashboard controller
    var db = $scope.$parent.db;

    // activate controller
    if (TcAuthService.isAuthenticated() === true) {
      db.addIdentityChangeListener("welcomeback", function(identity) {
        console.log(identity);
        activate(identity);
      });
      if (db.user) {
        activate(db.user);
      }
    } else { // if user is not logged in, return (to avoid extra ajax calls)
      return false;
    }

    function activate(user) {
      // fetch user info
      ProfileService.getUserProfile()
        .then(function(response) {
          var identityResp = response[0];
          var profileResp = response[1];
          var profile = profileResp.data;
          vm.profile = profile;

          var highestRating = 0;

          // Find user's highest rating to set color to the handle
          angular.forEach(vm.profile.ratingSummary, function(value, key) {
            if (highestRating < value.rating) {
              highestRating = value.rating;
              vm.ratingColor = value.colorStyle;
            }
          });

          vm.showUploadPhotoLink = false;
          console.log(profile);
          // Parse user picture link to build photo url
          if (profile && profile.photoLink) {
            if (profile.photoLink.indexOf('//') != -1){
              vm.photoLink = profile.photoLink;
            } else {
              vm.photoLink = CONSTANTS.PHOTO_LINK_LOCATION + profile.photoLink;
            }
          } else {
            vm.photoLink = CONSTANTS.PHOTO_LINK_LOCATION + '/i/m/nophoto_login.gif';
            vm.uploadPhotoLink = $location.protocol() + ":" + vm.communityBaseUrl + '/tc?module=MyHome';
            vm.showUploadPhotoLink = true;
          }

          // calculates the count of metrices to be shown in profile header
          if (vm.profile.overallEarning > 0) { // earnings should be shown
            vm.statsToShow = 3;
          } else { // earnings should not be shown
            vm.statsToShow = 2;
          }

        });

        // Get active challenges in ordor to populate user's active challenges and review opportunities
        ChallengeService.getMyActiveChallenges()
          .then(function(data) {

            vm.myActiveChallenges = data;

            var ctOpenChallenges = 0;
            var ctReviewChallenges = 0;
            var ctCopilotChallenges = 0;

            angular.forEach(vm.myActiveChallenges, function(challenge) {
              if (!challenge.roles) {
                return;
              }
              angular.forEach(challenge.roles, function(role) {
                var r = role.toLowerCase();
                if(r == "submitter") {
                  ctOpenChallenges++
                }
                if(r == "reviewer") {
                  ctReviewChallenges++
                }
                if(r == "copilot") {
                  ctCopilotChallenges++
                }
              });
            });

            vm.myOpenChallengesCount = ctOpenChallenges;
            vm.reviewOpportunities = ctReviewChallenges;
            vm.copilotChallengesCount = ctCopilotChallenges;
          });
    }
  }
})();
