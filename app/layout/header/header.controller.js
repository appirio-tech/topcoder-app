(function() {
  'use strict';

  angular.module('tc.layout').controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$window', '$state', '$stateParams', 'tcAuth', 'CONSTANTS', '$log', '$rootScope'];

  function HeaderController($window, $state, $stateParams, tcAuth, CONSTANTS, $log, $rootScope) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.login = tcAuth.login;
    vm.logout = logout;


    function initHeaderProps(event) {
      $log.debug(event + ' triggered header update.');
      vm.isAuth = tcAuth.isAuthenticated();
    }
    // init props default
    initHeaderProps('default');

    function logout() {
      tcAuth.logout().then(
        function() {
          // success
          $state.go('home');
        });
    };

    // List of events that might force header update
    angular.forEach([
      CONSTANTS.EVENT_USER_LOGGED_IN,
      CONSTANTS.EVENT_USER_LOGGED_OUT,
    ], function(event) {
      $rootScope.$on(event, function() {
        initHeaderProps(event);
      });
    });
  }

})();
