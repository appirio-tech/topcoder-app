(function() {
  'use strict';

  angular.module('validateLogin', [])
  .directive('usernameExists', usernameExists);

  usernameExists.$inject = ['UserService', '$log', '$q'];

  function usernameExists(UserService, $log, $q) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$asyncValidators.usernameExists = function(modelValue, viewValue) {
          $log.info('Validating username or email: ' + modelValue);

          // Check if the username exists
          var defer = $q.defer();
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
          return defer.promise;
        };
      }
    };
  }
})();
