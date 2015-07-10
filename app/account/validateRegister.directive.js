(function() {
  'use strict';

  angular.module('validateRegister', [])
  .directive('hasLetter', hasLetter)
  .directive('hasSymbol', hasSymbol)
  .directive('hasNumber', hasNumber)
  .directive('usernameIsFree', usernameIsFree);

  function hasLetter() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$validators.hasLetter = function(modelValue, viewValue) {
          if (/[a-zA-Z]/.test(viewValue)) {
            return true;
          }
          return false;
        };
      }
    };
  }

  function hasSymbol() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$validators.hasSymbol = function(modelValue, viewValue) {
          if (/[-!$@#%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(viewValue)) {
            return true;
          }
          return false;
        };
      }
    };
  }

  function hasNumber() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$validators.hasNumber = function(modelValue, viewValue) {
          if (/[\d]/.test(viewValue)) {
            return true;
          }
          return false;
        };
      }
    };
  }


  usernameIsFree.$inject = ['UserService', '$log', '$q'];

  function usernameIsFree(UserService, $log, $q) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$asyncValidators.usernameIsFree = function(modelValue, viewValue) {
          $log.info('Validating username or email: ' + modelValue);

          // Check if the username exists
          var defer = $q.defer();
          UserService.validateUserHandle(modelValue).then(
            function(resp) {
              // username is free
              return defer.resolve();
            },
            function(resp) {
              // username already exists
              return defer.reject();
            }
          );
          return defer.promise;
        };
      }
    };
  }
})();
