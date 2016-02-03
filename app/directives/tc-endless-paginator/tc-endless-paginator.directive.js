import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('tcEndlessPaginator', function() {
    return {
      restrict: 'E',
      replace: true,
      template: require('./tc-endless-paginator')(),
      scope: {
        state: '=',
        pageParams: '='
      },
      controller: ['$scope', function($scope) {
        $scope.loadMore = function() {
          $scope.pageParams.currentOffset += $scope.pageParams.limit
          $scope.pageParams.updated++
        }
      }]
    }
  })
})()
