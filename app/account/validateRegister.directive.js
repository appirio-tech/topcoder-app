(function() {
  'use strict';

  angular.module('validateRegister', [])
  .directive('hasLetter', hasLetter)
  .directive('hasSymbol', hasSymbol)
  .directive('hasNumber', hasNumber)
  .directive('usernameIsFree', usernameIsFree)
  .directive('emailIsAvailable', emailIsAvailable);

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
          $log.info('Validating username: ' + modelValue);

          // Check if the username exists
          var defer = $q.defer();
          UserService.validateUserHandle(modelValue).then(
            function(data) {
              if (data.valid) {
                // username is free
                return defer.resolve();
              } else {
                return defer.reject(data.reasonCode);
              }
            }
          ).catch(function(resp) {
              // call failed - assuming username is free, register call will fail anyways
              return defer.resolve();
          });
          return defer.promise;
        };
      }
    };
  }

  emailIsAvailable.$inject = ['UserService', '$log', '$q'];

  function emailIsAvailable(UserService, $log, $q) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$asyncValidators.emailIsAvailable = function(modelValue, viewValue) {
          $log.info('Validating email: ' + modelValue);

          // Check if the username exists
          var defer = $q.defer();
          UserService.validateUserEmail(modelValue).then(
            function(data) {
              if (data.valid) {
                // email is available
                return defer.resolve();
              } else {
                return defer.reject(data.reasonCode);
              }
            }
          ).catch(function(resp) {
              // call failed - assuming available is free, register call will fail anyways
              return defer.resolve();
          });
          return defer.promise;
        };
      }
    };
  }
})();
