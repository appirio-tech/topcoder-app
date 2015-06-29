(function() {
  'use strict';

  angular.module('tc.layout').controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$window', '$stateParams', 'auth', 'CONSTANTS'];

  function HeaderController($window, $stateParams, auth, CONSTANTS) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.login  = auth.login;
    vm.isAuth = auth.isAuthenticated;
    vm.logout = function() {
      auth.logout(function() {
        if($stateParams.challengeId) {
          $window.location.href = 'https://www.' + vm.domain + '/challenge-details/' + $stateParams.challengeId + '/?type=develop';
        }
      });
    };
  }

})();
