(function() {
  'use strict';

  angular.module('validateLogin', [])
  .directive('usernameExists', usernameExists);

  usernameExists.$inject = ['$timeout', '$q', '$log'];

  function usernameExists($timeout, $q, $log) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.usernameExists = function(username) {
          $log.info('Validating username or email: ' + username);

          // Fake API call that returns false
          // Check if the username exists here
          var defer = $q.defer();
          $timeout(function(){
            ngModel.$setValidity('usernameExists', true);
            defer.resolve;
          }, 1000);
          return defer.promise;
        };
      }
    };
  }
})();
