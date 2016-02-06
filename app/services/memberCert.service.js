import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.services').factory('MemberCertService', MemberCertService)

  MemberCertService.$inject = ['ApiService']

  function MemberCertService(ApiService) {
    var service = ApiService.restangularV3

    // Retrieves the registration status of the member for the given program
    service.getMemberRegistration = function(userId, programId) {
      return service.one('memberCert/registrations', userId).one('programs', programId).get()
    }

    // Retrieves the status of the logged in member for the peer badge
    service.peerBadgeCompleted = function(programId) {
      return service.all('badges').one('isCompleted').get({filter: 'eventId=' + programId})
    }

    // Registers the given member for the given program.
    service.registerMember = function(userId, programId) {
      return service.one('memberCert/registrations', userId).one('programs', programId).post()
    }

    return service
  }
})()
