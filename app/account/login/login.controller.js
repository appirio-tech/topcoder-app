(function() {
  'use strict';

  angular.module('tc.account').controller('LoginController', LoginController);

  LoginController.$inject = [];

  function LoginController() {
    var vm = this;
    vm.name = 'login';
  }
})();
