(function() {
  'use strict';

  angular.module('tc.account').controller('RegisterController', RegisterController);

  RegisterController.$inject = [];

  function RegisterController() {
    var vm = this;
    vm.name = 'register';
  }
})();
