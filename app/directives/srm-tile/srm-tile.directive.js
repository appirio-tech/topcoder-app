(function() {
  'use strict';
  angular.module('tcUIComponents').directive('srmTile', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/srm-tile/srm-tile.directive.html',
      scope: {
        srm: '=srm',
        view: '=',
        showResults: '=',
        showFooter: '='
      },
      controller: ['$scope', 'CONSTANTS', function($scope, CONSTANTS) {
        $scope.DOMAIN = CONSTANTS.domain;
        // TODO removed hard coded value
        $scope.registered = false;
        if (Array.isArray($scope.srm.rounds) && $scope.srm.rounds.length) {
          if ($scope.srm.rounds[0].userSRMDetails && $scope.srm.rounds[0].userSRMDetails.rated) {
            $scope.srm.result = $scope.srm.rounds[0].userSRMDetails;
          }
          if ($scope.srm.rounds[0].codingStartAt) {
            $scope.srm.codingStartAt = $scope.srm.rounds[0].codingStartAt;
          }
          if ($scope.srm.rounds[0].codingEndAt) {
            $scope.srm.codingEndAt = $scope.srm.rounds[0].codingEndAt;
          }
        }
      }]
    };
  });
})();
