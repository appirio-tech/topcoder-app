import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.settings').controller('SettingsController', SettingsController)

  SettingsController.$inject = ['$state', 'userHandle']

  function SettingsController($state, userHandle) {
    var vm = this
    vm.userHandle = userHandle

    activate()

    function activate() {
      if ($state.$current.name === 'settings') {
        $state.go('settings.profile')
      }
    }
  }

})()
