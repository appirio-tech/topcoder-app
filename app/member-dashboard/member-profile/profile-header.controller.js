(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('Dashboard.ProfileHeaderController', ProfileHeaderController);

  ProfileHeaderController.$inject = [
    '$scope',
    '$location',
    'TcAuthService',
    'ProfileService',
    'ChallengeService',
    'CONSTANTS'
  ];

  function ProfileHeaderController($scope, $location, TcAuthService, ProfileService, ChallengeService, CONSTANTS) {
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
        // activate(db.user);
      }
    } else { // if user is not logged in, return (to avoid extra ajax calls)
      return false;
    }

    function activate(user) {

      ProfileService.getUserProfile().then(function(profileRes) {
        vm.profile = profileRes.result.content;

        vm.showUploadPhotoLink = false;
        // Parse user picture link to build photo url
        if (vm.profile && vm.profile.photo.photoUrl) {
          if (vm.profile.photo.photoUrl.indexOf('//') != -1){
            vm.photoLink = vm.profile.photo.photoUrl;
          } else {
            vm.photoLink = CONSTANTS.PHOTO_LINK_LOCATION + vm.profile.photo.photoUrl;
          }
        } else {
          vm.photoLink = CONSTANTS.PHOTO_LINK_LOCATION + '/i/m/nophoto_login.gif';
          vm.uploadPhotoLink = $location.protocol() + ":" + vm.communityBaseUrl + '/tc?module=MyHome';
          vm.showUploadPhotoLink = true;
        }

        if (vm.profile.photo.photoUrl === '') {
          return vm.profile.photoLink = '//community.topcoder.com/i/m/nophoto_login.gif';
        } else {
          return vm.profile.photoLink = '//community.topcoder.com' + vm.profile.photo.photoUrl;
        }
      });

      ProfileService.getUserStats().then(function(response) {
        var stats = response.result.content;

        var highestRating, i, len, rating, ref;

        vm.handleColor = 'color: #000000';
        highestRating = 0;
        ref = stats.developStats.rankStats;
        for (i = 0, len = ref.length; i < len; i++) {
          rating = ref[i];
          if (rating.rating > highestRating) {
            highestRating = rating.rating;
            vm.handleColor = rating.colorStyle ? rating.colorStyle : '';
          }
        }
      });

      ProfileService.getUserFinancials().then(function(financials) {
        console.log(financials);

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
