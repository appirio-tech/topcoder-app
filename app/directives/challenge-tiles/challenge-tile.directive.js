(function() {
  'use strict';
  angular.module('tcUIComponents').directive('challengeTile', function() {
    return {
      restrict: 'E',
      templateUrl: function(elem, attrs) {
        if (attrs.spotlight) {
          return 'directives/challenge-tiles/spotlight-tile.directive.html';
        }

        return 'directives/challenge-tiles/challenge-tile.directive.html';

        if (attrs.challenge.challengeType = "SRM") {
          return 'directives/challenge-tiles/srm-tile.directive.html';
        }

      },
      scope: {
        challenge: '=challenge'
      },
      controller: ['$scope', 'CONSTANTS', function($scope, CONSTANTS) {
        $scope.DOMAIN = CONSTANTS.domain;
      }]
    };
  });
})();
