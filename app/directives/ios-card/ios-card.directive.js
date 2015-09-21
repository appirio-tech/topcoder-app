(function() {
  'use strict';
  angular.module('tcUIComponents').directive('iosCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/ios-card/ios-card.directive.html',
      scope: {
        challenge: '=challenge',
        view: '='
      },
      controller: ['$scope', 'CONSTANTS', function($scope, CONSTANTS) {
        $scope.DOMAIN = CONSTANTS.domain;
      }]
    };
  });
})();
