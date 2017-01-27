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
        pageParams: '=',
        firstLoadMore: '=?'
      },
      controller: ['$scope', function($scope) {
        $scope.firstLoadMore = true
        $scope.loadMore = function() {
          $scope.pageParams.currentOffset += $scope.pageParams.limit
          $scope.pageParams.updated++
          $scope.firstLoadMore = false
        }
      }]
    }
  })
})()
