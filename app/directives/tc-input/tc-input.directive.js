import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('tcInput', tcInput)

  function tcInput() {
    return {
      restrict: 'E',
      template: require('./tc-input')(),
      scope: {
        labelText: '@',
        asteriskText: '@',
        showAsteriskText: '@',
        placeholder: '@',
        inputValue: '=',
        inputName: '@',
        inputType: '@',
        inputPattern: '=',
        inputRequired: '=',
        inputDisabled: '=',
        maxlength: '@',
        updateValueOnBlur: '&?',
        onInputChange: '&?'
      },
      link: function(scope, element, attrs) {
        var input = $(element[0]).find('input')

        if (!scope.inputType) {
          scope.inputType = 'text'
        }

        if (scope.updateValueOnBlur) {
          input.bind('blur', function(event) {
            var newValue = scope.updateValueOnBlur({inputValue: scope.inputValue})
            scope.inputValue = newValue
            scope.$apply()
          })
        }

        if (scope.onInputChange) {
          scope.$watch('inputValue', function(newValue, oldValue) {
            scope.onInputChange({inputValue: scope.inputValue, inputName: scope.inputName})
          })
        }
      }
    }
  }
})()
