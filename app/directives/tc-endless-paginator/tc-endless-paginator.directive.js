(function() {
  'use strict';
  angular.module('tcUIComponents').directive('tcEndlessPaginator', function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'directives/tc-endless-paginator/tc-endless-paginator.html',
      scope: {
        totalCount: '@',
        currentLength: '@',
        getterFunc: '='
      },
      controller: ['$log', '$scope', '$element', function($log, $scope, $element) {
        $scope.loadMore = function() {
          currentOffset+=1;
          getterFunc(currentOffset, false);
        };
      }],
      controllerAs: 'vm'
    };
  });
})();
