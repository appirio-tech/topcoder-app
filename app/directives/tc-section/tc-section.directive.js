(function() {
  'use strict';
  angular.module('tcUIComponents').directive('tcSection', function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'directives/tc-section/tc-section.html',
      scope: {
        state: '=state'
      },
      controller: ['$log', '$scope', function($log, $scope) {
        $log.debug("state ", $scope.state);
        $scope.errMsg = "You messed up son!"
      }]
    };
  });
})();
