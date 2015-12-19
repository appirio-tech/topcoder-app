(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcTextarea', tcTextarea);

  function tcTextarea() {
    return {
      restrict: 'E',
      templateUrl: 'directives/tc-textarea/tc-textarea.html',
      scope: {
        labelText: '@',
        placeholder: '@',
        characterCount: '=',
        characterCountMax: '@',
        commentValue: '='
      },
      link: function(scope) {
        console.log(scope);
      }
    }
  }
})();
