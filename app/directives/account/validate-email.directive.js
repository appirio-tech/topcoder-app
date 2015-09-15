(function() {
  'use strict';

  angular.module('tcUIComponents').directive('validEmail', validEmail);

  function validEmail() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$validators.validEmail = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            return true;
          }

          if (/.+@.+\..+/.test(viewValue)) {
            return true;
          }

          scope.vm.emailErrorMessage = 'Please enter a valid email address.';
          return false;
        };
      }
    };
  }
})();
