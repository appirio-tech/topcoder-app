(function() {
  'use strict';

  angular.module('tcUIComponents').directive('challengeTile', challengeTile);

  function challengeTile() {
    return {
      restrict: 'E',
      templateUrl: function(elem, attrs) {
        if (attrs.spotlight) {
          return 'directives/challenge-tiles/spotlight-tile.directive.html';
        }

        return 'directives/challenge-tiles/challenge-tile.directive.html';
      },
      scope: {
        challenge: '=',
        view: '='
      },
      controller: ['$scope', 'CONSTANTS', '$attrs', function($scope, CONSTANTS, $attrs) {
        $scope.DOMAIN = CONSTANTS.domain;

        activate();

        function activate() {
          if (!$attrs.spotlight) {
            processChallenge($scope.challenge);
          }
        }

        function processChallenge(challenge) {
          $scope.subTrack = challenge.subTrack.replace(/_/g, ' ');
          // if (challenge.track == 'DESIGN' && challenge.userDetails.submissions && challenge.userDetails.submissions.length > 0) {
          //   challenge.thumbnailId = challenge.userDetails.submissions[0].id;
          // }
        }
      }]
    };
  }
})();
