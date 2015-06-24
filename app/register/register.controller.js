(function() {
  'use strict';

  angular.module('topcoder-account').controller('Register', Register);

  Register.$inject = ['$scope'];
  function Register($scope) {
    $scope.name = 'Register';
  }
})();
