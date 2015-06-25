(function() {
  'use strict';

  angular.module('topcoder-account').controller('Register', Register);

  Register.$inject = [];

  function Register() {
    var vm = this;
    vm.name = 'register';
  }
})();
