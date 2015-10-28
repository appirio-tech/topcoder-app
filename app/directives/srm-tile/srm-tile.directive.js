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
      controller: ['$scope', '$filter', 'CONSTANTS', 'SRMService',
        function($scope, $filter, CONSTANTS, SRMService) {
        $scope.DOMAIN = CONSTANTS.domain;
        $scope.CONSTANTS = CONSTANTS;
        $scope.srm.userStatus = _.get($scope.srm, 'userStatus', null);
        SRMService.processSRM($scope.srm);
      }]
    };
  });
})();
