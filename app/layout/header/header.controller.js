(function() {
  'use strict';

  angular.module('tc.layout').controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$window', '$stateParams', 'Auth', 'ENV', 'ProfileService'];

  function HeaderController() {
    var vm = this;
    $vm.domain = ENV.domain
    $vm.login  = Auth.login
    $vm.isAuth = Auth.isAuthenticated
    $vm.logout = function() {
      Auth.logout(function() {
        if($stateParams.challengeId) {
          $window.location.href = 'https://www.' + vm.domain + '/challenge-details/' + $stateParams.challengeId + '/?type=develop';
        }
      });
    }
  }

})();
