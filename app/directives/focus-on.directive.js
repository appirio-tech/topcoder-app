(function() {
  'use strict';

  angular.module('tcUIComponents').directive('focusOn', focusOn);

  function focusOn() {
    return function(scope, element, attr) {
      scope.$watch(attr.focusOn, function(newValue) {
        console.log('refocusing on element');
        element[0].focus();
      });
    };
  }
})();
