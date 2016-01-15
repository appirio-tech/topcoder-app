(function() {
  'use strict';

  angular.module('tcUIComponents').directive('progressBar', progressBar);

  progressBar.$inject = ['$timeout', '$parse'];

  function progressBar($timeout, $parse) {
    return {
      restrict: 'E',
      templateUrl: 'directives/progress-bar/progress-bar.directive.html',
      link: function(scope, element, attr) {
        var model = $parse(attr.completed);
        var msg = attr.message;
        var progress = angular.element(element[0].querySelector('.progress-bar__bar--completed'));

        scope.$watch(model, function(newValue, oldValue) {
          scope.completed = Math.round(newValue);
          // console.log("Updating progress bar with " + scope.completed);
          scope.message = msg;
          progress.css('width', scope.completed + '%')
        });
      },
      controller: ['$scope', function($scope) {

      }]
    };
  }
})();
