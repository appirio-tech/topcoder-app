import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.myDashboard').controller('HeaderDashboardController', HeaderDashboardController)

  HeaderDashboardController.$inject = ['$stateParams', 'profile', '$log']

  function HeaderDashboardController($stateParams, profile, $log) {
    var vm = this
    vm.profile = profile

    activate()

    function activate() {}
  }
})()
