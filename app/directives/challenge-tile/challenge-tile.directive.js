(function() {
  'use strict';

  angular.module('tcUIComponents')
    .directive('challengeTile', challengeTile)
    .filter('challengeLinks', ['CONSTANTS', challengeLinks]);

  function challengeTile() {
    return {
      restrict: 'E',
      templateUrl: 'directives/challenge-tile/challenge-tile.directive.html',
      scope: {
        challenge: '=',
        view: '='
      },
      controller: ['$scope', 'CONSTANTS', '$attrs', 'ChallengeService', 'ngDialog', function($scope, CONSTANTS, $attrs, ChallengeService, ngDialog) {
        $scope.DOMAIN = CONSTANTS.domain;
        $scope.openLightbox = openLightbox;

        activate();

        function activate() {
          // move to service helper, called from controller
          if ($scope.challenge.status.trim().toUpperCase() === 'PAST' && $scope.challenge.subTrack === 'MARATHON_MATCH') {
            ChallengeService.processPastMarathonMatch($scope.challenge);
          }
        }

        function openLightbox() {
          ngDialog.open({
            template: 'directives/challenge-tile/design-lightbox/design-lightbox.html',
            className: 'ngdialog-theme-default',
            scope: $scope
          });
        }
      }]
    };
  }

  function challengeLinks(CONSTANTS) {
    return function(challenge, type) {
      if (challenge.subTrack === 'MARATHON_MATCH') {
        var data = {
          domain: CONSTANTS.domain,
          roundId: challenge.rounds[0].id,
          forumId: challenge.rounds[0].forumId
        };
        switch (type) {
          case 'forums':
            return String.supplant('http://apps.{domain}/forums/?module=Category&categoryID={forumId}', data);
          case 'registrants':
            return String.supplant('https://community.{domain}/longcontest/?module=ViewStandings&rd={roundId}', data);
          case 'detail':
            return String.supplant('https://community.{domain}/tc?module=MatchDetails&rd={roundId}', data);
        }
      } else {
        var data = {
          domain: CONSTANTS.domain,
          track: challenge.track,
          forumId: challenge.forumId
        };
        switch (type) {
          case 'forums':
            return String.supplant('http://apps.{domain}/forums/?module=Category&categoryID={forumId}', data);
          case 'submissions':
          case 'registrants':
            return String.supplant('https://www.{domain}/challenge-details/{id}/?type={track}#viewRegistrant', data);
          case 'detail':
            return String.supplant('https://www.{domain}/challenge-details/{id}/?type={track}', data);
        }
      }
    }
  }
})();
