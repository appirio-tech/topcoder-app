(function() {
  'use strict';

  angular.module('tcUIComponents').directive('togglePassword', togglePassword);

  function togglePassword() {
    return {
      restrict: 'A',
      transclude: true,
      templateUrl: 'directives/account/toggle-password/toggle-password.html',
      controller: ['$scope', '$element', '$attrs', '$transclude', '$timeout', function($scope, $element, $attrs, $transclude, $timeout) {

        $scope.broadcastOnClick = function() {
          $timeout(function() {
            $scope.$broadcast('focusPassword');
          });
        };

        $element.bind('mousedown', $scope.broadcastOnClick);
        $element.bind('change', function() {
          $scope.$broadcast('toggleType');
        });
      }]
    };
  }
})();
