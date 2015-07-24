(function() {
  'use strict';

  angular.module('validateLogin', [])
  .directive('usernameOrEmailExists', usernameOrEmailExists);

  usernameOrEmailExists.$inject = ['UserService', 'Helpers', '$log', '$q'];


  function usernameOrEmailExists(UserService, Helpers, $log, $q) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$asyncValidators.usernameOrEmailExists = function(modelValue, viewValue) {
          $log.info('Validating username or email: ' + modelValue);
          // Check if the username exists
          var defer = $q.defer();
          if (Helpers.isEmail(modelValue)) {
            // ensure email exists
            UserService.validateUserEmail(modelValue).then(
            function(resp) {
              // email doesn't exist
              return defer.reject();
            },
            function(resp) {
              // email exists
              return defer.resolve();
            });
          } else {
            // make sure username exists
            UserService.validateUserHandle(modelValue).then(
              function(resp) {
                // doesn't exists
                return defer.reject();
              },
              function(resp) {
                // user exists --yipeee
                return defer.resolve();
              }
            );
          }
          return defer.promise;
        };
      }
    };
  }
})();
