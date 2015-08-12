(function() {
  'use strict';
  angular.module('tcUIComponents').directive('srmTile', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/srm-tile/srm-tile.directive.html',
      scope: {
        srm: '=srm'
      },
      controller: ['$scope', 'CONSTANTS', function($scope, CONSTANTS) {
        $scope.DOMAIN = CONSTANTS.domain;
      }]
    };
  });
})();
