(function() {
  'use strict';

  angular.module('topcoder-account').controller('Login', Login);

  Login.$inject = ['$scope'];
  function Login($scope) {
    $scope.name = 'login';
  }
})();
