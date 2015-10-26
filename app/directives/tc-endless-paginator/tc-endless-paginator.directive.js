(function() {
  'use strict';
  angular.module('tcUIComponents').directive('tcEndlessPaginator', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'directives/tc-endless-paginator/tc-endless-paginator.html',
      scope: {
        state: '=',
        pageParams: '='
      },
      controller: ['$log', '$scope', '$element', function($log, $scope, $element) {
        $scope.loadMore = function() {
          $scope.pageParams.currentOffset += $scope.pageParams.limit;
          $scope.pageParams.updated++;
        };
      }]
    };
  });
})();
