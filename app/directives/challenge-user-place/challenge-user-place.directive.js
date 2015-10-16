(function() {
  'use strict';

  angular.module('tcUIComponents')
    .directive('devChallengeUserPlace', devChallengeUserPlace)
    .directive('designChallengeUserPlace', designChallengeUserPlace);

  function devChallengeUserPlace() {
    return {
      restrict: 'E',
      templateUrl: 'directives/challenge-user-place/dev-challenge-user-place.directive.html',
      scope: {
        challenge: '=',
        view: '='
      },
      controller: ['$scope', 'CONSTANTS', '$attrs', 'ChallengeService',
       function($scope, CONSTANTS, $attrs, ChallengeService) {
        $scope.DOMAIN = CONSTANTS.domain;

        activate();

        function activate() {
        }
      }]
    };
  }

  function designChallengeUserPlace() {
    return {
      restrict: 'E',
      templateUrl: 'directives/challenge-user-place/design-challenge-user-place.directive.html',
      scope: {
        challenge: '=',
        view: '='
      },
      controller: ['$scope', 'CONSTANTS', '$attrs', 'ChallengeService',
       function($scope, CONSTANTS, $attrs, ChallengeService) {
        $scope.DOMAIN = CONSTANTS.domain;

        activate();

        function activate() {
          if ($scope.challenge.userDetails.submissions && $scope.challenge.userDetails.submissions.length > 0) {
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
