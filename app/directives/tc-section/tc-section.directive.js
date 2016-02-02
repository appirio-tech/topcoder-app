import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('tcSection', function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: require('./tc-section')(),
      scope: {
        state: '=state'
      },
      controller: ['$log', '$scope', '$element', function($log, $scope, $element) {
        $log.debug('state ', $scope.state)
        $element.addClass('tc-section')
        $scope.errMsg = 'Whoops! Something went wrong. Please try again later.'
      }]
    }
  })
})()
