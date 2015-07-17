(function() {
  'use strict';
  angular.module('tcUIComponents', []).directive('challengeTile', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/challenge-tile/challenge-tile.directive.html',
      scope: {
        challenge: '=challenge'
      }
    };
  });
})();
