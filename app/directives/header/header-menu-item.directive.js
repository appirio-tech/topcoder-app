(function() {
  'use strict';
  angular.module('tcUIComponents').directive('headerMenuItem', function() {

    return {
      restrict: 'E',
      templateUrl: 'directives/header/header-menu-item.directive.html',
      scope: {
        item: '='
      },
      controller: ['$scope', '$state', function($scope, $state) {
        var sref = $scope.item.sref;
        var href = $scope.item.href;

        // I believe I have to hack this because of https://github.com/angular-ui/ui-router/issues/395, I tried ui-state
        if ($scope.item.srefParams)
          $scope.wtfhref = $state.href($scope.item.sref, $scope.item.srefParams);

        $scope.isActive = function() {
          if (window.location.pathname == href || $state.is(sref))
            return true;
          return false;
        }
      }]
    };
  });
})();