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
      controller: ['$scope', 'CONSTANTS', 'ChallengeService', '$attrs', function($scope, CONSTANTS, ChallengeService, $attrs) {
        $scope.DOMAIN = CONSTANTS.domain;

        activate();

        function activate() {
          // move to service helper, called from controller
          if ($scope.challenge.status.trim().toUpperCase() === 'PAST' &&
            $scope.challenge.subTrack === 'MARATHON_MATCH') {
            ChallengeService.processPastMarathonMatch($scope.challenge);
          }
          if ($scope.challenge.track == 'DESIGN' && $scope.challenge.userDetails.submissions && $scope.challenge.userDetails.submissions.length > 0) {
            $scope.challenge.thumbnailId = $scope.challenge.userDetails.submissions[0].id;

            $scope.challenge.highestPlacement = _.max($scope.challenge.userDetails.submissions, 'placement').placement;

            if ($scope.challenge.highestPlacement == 1) {
              $scope.challenge.wonFirst = true;
            }
          }
        }
      }]
    };
  }
})();
