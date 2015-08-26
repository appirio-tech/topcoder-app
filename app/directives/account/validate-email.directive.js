(function() {
  'use strict';

  angular.module('tcUIComponents')
    .directive('validEmail', validEmail);
    
  function validEmail() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$validators.validEmail = function(modelValue, viewValue) {
          if (/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(viewValue)) {
            return true;
          }
          return false;
        };
      }
    };
  }
})();