import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('challengeTile', challengeTile)

  function challengeTile() {
    return {
      restrict: 'E',
      template: require('./challenge-tile')(),
      scope: {
        challenge: '=',
        view: '='
      },
      controller: ['$scope', 'CONSTANTS', '$attrs', 'ChallengeService', 'ngDialog', function($scope, CONSTANTS, $attrs, ChallengeService, ngDialog) {
        $scope.DOMAIN = CONSTANTS.domain
        $scope.openLightbox = openLightbox

        activate()

        function activate() {
          // move to service helper, called from controller
          if ($scope.challenge.status.trim().toUpperCase() === 'PAST' && $scope.challenge.subTrack === 'MARATHON_MATCH') {
            ChallengeService.processPastMarathonMatch($scope.challenge)
          }
        }

        function openLightbox() {
          ngDialog.open({
            plain: true,
            template: require('./design-lightbox/design-lightbox')(),
            className: 'ngdialog-theme-default',
            scope: $scope
          })
        }
      }]
    }
  }
})()
