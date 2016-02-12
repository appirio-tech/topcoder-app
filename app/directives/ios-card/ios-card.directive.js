import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('iosCard', function() {
    return {
      restrict: 'E',
      template: require('./ios-card')(),
      scope: {
        challenge: '=challenge',
        view: '='
      },
      controller: ['$scope', 'CONSTANTS', function($scope, CONSTANTS) {
        $scope.DOMAIN = CONSTANTS.domain
      }]
    }
  })
})()
