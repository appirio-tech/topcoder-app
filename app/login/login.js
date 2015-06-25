(function() {
  'use strict';

  angular.module('topcoder-account').controller('Login', Login);

  Login.$inject = [];

  function Login() {
    var vm = this;
    vm.name = 'login';
  }
})();
