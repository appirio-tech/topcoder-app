(function () {
  'use strict';

  angular.module('tcUIComponents').directive('trackToggle', trackToggle);


  trackToggle.$inject = [];

  function trackToggle() {
    return {
      restrict: 'E',
      templateUrl: 'directives/track-toggle/track-toggle.directive.html',
      scope: {
        tracks: '=tracks',
      },
      controller: ['$scope', trackToggleController]
    }
  }

  function trackToggleController($scope) {

  }

})();
