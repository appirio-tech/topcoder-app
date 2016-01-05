(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcInput', tcInput);

  function tcInput() {
    return {
      restrict: 'E',
      templateUrl: 'directives/tc-input/tc-input.html',
      scope: {
        labelText: '@',
        placeholder: '@',
        inputValue: '=',
        inputName: '@',
        inputType: '@',
        inputPattern: '='
      },
      link: function(scope, element, attrs) {
        if (!scope.inputType) {
          scope.inputType = 'text';
        }
      }
    }
  }
})();
