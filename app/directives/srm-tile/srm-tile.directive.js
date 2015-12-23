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
        showFooter: '=',
        userId: '='
      },
      controller: ['$scope', '$filter', 'CONSTANTS', 'SRMService',
        function($scope, $filter, CONSTANTS, SRMService) {
          $scope.DOMAIN = CONSTANTS.domain;
          $scope.CONSTANTS = CONSTANTS;
          $scope.srm.userStatus = _.get($scope.srm, 'userStatus', null);
          SRMService.processSRM($scope.srm);
          $scope.roundId = $scope.srm.rounds.length && $scope.srm.rounds[0].id;
          $scope.division = $scope.srm.result && $scope.srm.result.division;
      }]
    };
  });
})();
