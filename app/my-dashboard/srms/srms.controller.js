import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.myDashboard').controller('SRMWidgetController', SRMWidgetController)

  SRMWidgetController.$inject = ['CONSTANTS', 'UserService','SRMService', '$q', '$log', 'logger']

  function SRMWidgetController(CONSTANTS, UserService, SRMService, $q, $log, logger) {
    var vm = this
    vm.srms = []
    vm.state = CONSTANTS.STATE_LOADING

    var userId = UserService.getUserIdentity().userId
    var handle = UserService.getUserIdentity().handle
    vm.userId = userId

    activate()

    function activate() {
      getSRMs()
    }

    function getSRMs() {
      var params = {
        filter: 'status=future',
        orderBy: 'registrationStartAt',
        limit: 3
      }

      $q.all([
        SRMService.getSRMs(params),
        // passing same params for user srms too, because it is highly unlikely that a member is registered
        // for more than 3 SRMs at a time as we don't have more than 3 active SRMs at the same time.
        SRMService.getUserSRMs(handle, params)
      ]).then(function(data) {
        var srms = data[0]
        var userSrms = data[1]
        var userSrmsMap = {}
        userSrms = userSrms.map(function (srm) {
          var id = srm.id
          userSrmsMap[id] = srm
        })
        // populates a map of user's future SRMs
        srms.forEach(function(srm) {
          if (userSrmsMap[srm.id]) {
            srm.userStatus = CONSTANTS.REGISTERED
          }
        })

        vm.srms = srms
        vm.state = CONSTANTS.STATE_READY
      }).catch(function(err) {
        logger.error('Could not get list of SRMs or user SRMs', err)

        vm.state = CONSTANTS.STATE_ERROR
      })
    }
  }
})()
