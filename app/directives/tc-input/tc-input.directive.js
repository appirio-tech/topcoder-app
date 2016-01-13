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
        inputPattern: '=',
        inputRequired: '=',
        inputDisabled: '=',
        maxlength: '@',
        updateValueOnBlur: '&?'
      },
      link: function(scope, element, attrs) {
        var input = $(element[0]).find('input');

        if (!scope.inputType) {
          scope.inputType = 'text';
        }

        if (scope.updateValueOnBlur) {
          input.bind('blur', function(event) {
            var newValue = scope.updateValueOnBlur({inputValue: scope.inputValue});
            scope.inputValue = newValue;
            scope.$apply();
          });
        }
      }
    }
  }
})();
