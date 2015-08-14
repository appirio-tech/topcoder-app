(function() {
  'use strict';

  angular.module('tcUIComponents').directive('focusOn', focusOn);

  focusOn.$inject = ['$timeout'];

  function focusOn($timeout) {
    return function(scope, element, attr) {
      scope.$watch('refocus', function(newValue) {
        $timeout(function() {
          if (newValue !== undefined) {
            console.log('refocusing on element');
            element[0].focus();
          }
        }, 0);
      });
    };
  }
})();
