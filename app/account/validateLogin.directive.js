(function() {
  'use strict';

  angular.module('validateLogin', [])
  .directive('usernameExists', usernameExists);

  usernameExists.$inject = ['UserService', '$log', '$q'];

  function usernameExists(UserService, $log, $q) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$asyncValidators.username = function(modelValue, viewValue) {
          $log.info('Validating username or email: ' + modelValue);

          // Fake API call that returns false
          // Check if the username exists here
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
