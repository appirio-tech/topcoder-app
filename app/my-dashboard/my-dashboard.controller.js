import angular from 'angular'
import _ from 'lodash'

(function () {
  'use strict'

  angular.module('tc.myDashboard').controller('MyDashboardController', MyDashboardController)

  MyDashboardController.$inject = ['userIdentity', 'ProfileService', '$log']

  function MyDashboardController(userIdentity, ProfileService, $log) {
    var vm = this

    activate()

    function activate() {
      vm.showSRMs = false
      vm.isCopilot = _.includes(userIdentity.roles, 'copilot')

      displaySRMsBasedOnTrack()
    }

    function displaySRMsBasedOnTrack() {
      ProfileService.getUserProfile(userIdentity.handle)
      .then(function(userProfile) {
        var isDesigner = _.includes(userProfile.tracks, 'DESIGN')

        if (isDesigner && userProfile.tracks.length === 1) {
          vm.showSRMs = false
        } else {
          vm.showSRMs = true
        }
      })
      .catch(function(err) {
        vm.showSRMs = false
        $log.error(err)
      })
    }
  }
})()
