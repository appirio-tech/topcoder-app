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
      controller: ['$scope', 'CONSTANTS', '$attrs', 'ChallengeService', 'ngDialog',
       function($scope, CONSTANTS, $attrs, ChallengeService, ngDialog) {
        $scope.DOMAIN = CONSTANTS.domain;
        $scope.openLightbox = openLightbox;
        $scope.updateSelected = updateSelected;
        $scope.incrementIndex = incrementIndex;

        activate();

        function activate() {
          $scope.numImages = 0;
          if (!$scope.challenge.isPrivate && $scope.challenge.userDetails.submissions && $scope.challenge.userDetails.submissions.length > 0) {
            $scope.challenge.userDetails.submissions = $scope.challenge.userDetails.submissions.filter(function(submission) {
              return submission && submission.submissionImage;
            });
            $scope.numImages = $scope.challenge.userDetails.submissions.length;
            $scope.selectedIndex = 0;
            $scope.challenge.thumbnailId = $scope.challenge.userDetails.submissions[0].id;
            $scope.imageURL = $scope.challenge.userDetails.submissions[0].submissionImage && $scope.challenge.userDetails.submissions[0].submissionImage.full;
            $scope.selectedImage = $scope.imageURL;

            $scope.challenge.highestPlacement = _.max($scope.challenge.userDetails.submissions, 'placement').placement;

            if ($scope.challenge.highestPlacement == 1) {
              $scope.challenge.wonFirst = true;
            }
          }
        }

        function updateSelected(newImage, index) {
          $scope.selectedImage = newImage;
          $scope.selectedIndex = index;
        }

        function incrementIndex(x) {
          $scope.selectedIndex += x;
          if ($scope.selectedIndex < 0) $scope.selectedIndex = $scope.challenge.userDetails.submissions.length - 1;
          if ($scope.selectedIndex == $scope.challenge.userDetails.submissions.length) $scope.selectedIndex = 0;
          $scope.selectedImage = $scope.challenge.userDetails.submissions[$scope.selectedIndex].submissionImage && $scope.challenge.userDetails.submissions[$scope.selectedIndex].submissionImage.full;
        }

        function openLightbox() {
          ngDialog.open({
            template: 'directives/challenge-user-place/design-lightbox/design-lightbox.html',
            className: 'design-lightbox',
            scope: $scope
          });
        }

      }]
    };
  }
})();
