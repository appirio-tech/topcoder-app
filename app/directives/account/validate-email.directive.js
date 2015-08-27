(function() {
  'use strict';

  angular.module('tcUIComponents')
    .directive('validEmail', validEmail);
    
  function validEmail() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$validators.validEmail = function(modelValue, viewValue) {
          if (/.+@.+\..+/.test(viewValue)) {
            return true;
          }
          return false;
        };
      }
    };
  }
})();