(function() {
  'use strict';

  angular.module('tcUIComponents').directive('challengeTile', challengeTile);

  function challengeTile() {
    return {
      restrict: 'E',
      templateUrl: 'directives/challenge-tile/challenge-tile.directive.html',
      scope: {
        challenge: '=',
        view: '='
      },
      controller: ['$scope', 'CONSTANTS', '$attrs', function($scope, CONSTANTS, $attrs) {
        $scope.DOMAIN = CONSTANTS.domain;

        activate();

        function activate() {
          // console.log($scope.challenge.plain());
          processChallenge($scope.challenge);
        }

        function processChallenge(challenge) {
          challenge.isPastDesignChallenge = false;
          $scope.subTrack = challenge.subTrack.replace(/_/g, ' ');
          if (challenge.status === 'COMPLETED' && challenge.track === 'DESIGN') {
            challenge.isPastDesignChallenge = true;
          }

          if (challenge.track === 'DESIGN' && challenge.userDetails.submissions && challenge.userDetails.submissions.length > 0) {
            challenge.thumbnailId = challenge.userDetails.submissions[0].id;

          }
        }
      }]
    };
  }
})();
