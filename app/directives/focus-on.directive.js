(function() {
  'use strict';

  angular.module('tcUIComponents').directive('focusOn', focusOn);

  function focusOn() {
    return function(scope, element, attr) {
      scope.$on(attr.focusOn, function(e) {
        element[0].focus();
      });

      scope.$on('toggleType', function(e) {
        if (element.attr('type') === 'password') {
          element.attr('type', 'text');
        } else {
          element.attr('type', 'password');
        }
      })
    };
  }
})();
