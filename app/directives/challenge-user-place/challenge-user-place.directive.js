import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tcUIComponents')
    .directive('devChallengeUserPlace', devChallengeUserPlace)
    .directive('designChallengeUserPlace', designChallengeUserPlace)

  function devChallengeUserPlace() {
    return {
      restrict: 'E',
      template: require('./dev-challenge-user-place')(),
      scope: {
        challenge: '=',
        view: '='
      },
      controller: ['$scope', 'CONSTANTS', '$attrs', 'ChallengeService', function($scope, CONSTANTS, $attrs, ChallengeService) {
        $scope.DOMAIN = CONSTANTS.domain

        activate()

        function activate() {
        }
      }]
    }
  }

  function designChallengeUserPlace() {
    return {
      restrict: 'E',
      template: require('./design-challenge-user-place')(),
      scope: {
        challenge: '=',
        view: '='
      },
      controller: ['$scope', 'CONSTANTS', '$attrs', 'ChallengeService', 'ngDialog', function($scope, CONSTANTS, $attrs, ChallengeService, ngDialog) {
        $scope.DOMAIN = CONSTANTS.domain
        $scope.openLightbox = openLightbox
        $scope.updateSelected = updateSelected
        $scope.incrementIndex = incrementIndex

        activate()

        function activate() {
          $scope.numImages = 0
          if ($scope.challenge.userDetails && $scope.challenge.userDetails.submissions && $scope.challenge.userDetails.submissions.length > 0) {
            $scope.challenge.userDetails.submissions = $scope.challenge.userDetails.submissions.filter(function(submission) {
              return submission && submission.submissionImage
            })
            $scope.challenge.userDetails.submissions = _.sortBy($scope.challenge.userDetails.submissions, function(submission) {
              return submission.placement
            })
          }
          if (!$scope.challenge.isPrivate && $scope.challenge.userDetails && $scope.challenge.userDetails.submissions && $scope.challenge.userDetails.submissions.length > 0) {
            $scope.numImages = $scope.challenge.userDetails.submissions.length
            $scope.selectedIndex = 0
            $scope.challenge.thumbnailId = $scope.challenge.userDetails.submissions[0].id
            $scope.imageURL = $scope.challenge.userDetails.submissions[0].submissionImage && $scope.challenge.userDetails.submissions[0].submissionImage.full
            $scope.selectedImage = $scope.imageURL
          }
        }

        function updateSelected(newImage, index) {
          $scope.selectedImage = newImage
          $scope.selectedIndex = index
        }

        function incrementIndex(x) {
          $scope.selectedIndex += x
          if ($scope.selectedIndex < 0) $scope.selectedIndex = $scope.challenge.userDetails.submissions.length - 1
          if ($scope.selectedIndex == $scope.challenge.userDetails.submissions.length) $scope.selectedIndex = 0
          $scope.selectedImage = $scope.challenge.userDetails.submissions[$scope.selectedIndex].submissionImage && $scope.challenge.userDetails.submissions[$scope.selectedIndex].submissionImage.full
        }

        function openLightbox() {
          ngDialog.open({
            plain: true,
            template: require('./design-lightbox/design-lightbox')(),
            className: 'design-lightbox',
            scope: $scope
          })
        }
      }]
    }
  }
})()
