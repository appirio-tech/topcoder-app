(function() {
  'use strict';

  angular.module('topcoder').controller('TopcoderController', TopcoderController);

  TopcoderController.$inject = ['$window', '$stateParams', 'auth', 'CONSTANTS', 'profile'];

  function TopcoderController($window, $stateParams, auth, CONSTANTS, profile) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.sidebarActive = false;

    vm.logout = function() {
      auth.logout(function() {
        if($stateParams.challengeId) {
          $window.location.href = 'https://www.' + vm.domain + '/challenge-details/' + $stateParams.challengeId + '/?type=develop';
        }
      });
    };

    // profile.getUserProfile()
    // .then(function(response) {
    //   vm.profile     = response.data;
    //   vm.handleColor = 'color: #000000';

    //   // TODO: Should this be moved to a helper function?
    //   var highestRating  = 0;
    //   angular.forEach(response.data.ratingSummary, function(rating) {
    //     if(rating.rating > highestRating) {
    //       highestRating  = rating.rating;
    //       vm.handleColor = rating.colorStyle;
    //     }
    //   });

    //   if(vm.profile.photoLink === '') {
    //     vm.profile.photoLink = '//community.topcoder.com/i/m/nophoto_login.gif';
    //   } else {
    //     vm.profile.photoLink = '//community.topcoder.com' + vm.profile.photoLink;
    //   }
    // });

  }
})();
