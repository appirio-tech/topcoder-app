/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 * @author mdesiderio
 * @version 1.0
 *
 * ProfileService. Factory to access topcoder api for profile information
 */
(function () {

  angular
    .module('tc.myDashboard')
    .factory('memberCert', ProfileService);

  ProfileService.$inject = ['api', 'authtoken'];

  /**
   * SRMService 
   * @param Restangular to access the REST api
   * @constructor
   */
  function ProfileService(api, authtoken) {
    var service = api.restangularV3;

    /**
     * getMemberRegistration Retrieves the registration status of the member for the given program
     * @param userId string id of the user
     * @param programId string id of the program of the registration
     * @returns promise
     */
    service.getMemberRegistration = function(userId, programId) {
      return service.one("memberCert/registrations", userId).one("programs", programId).get();
    }

    /**
     * peerBadgeCompleted Retrieves the status of the logged in member for the peer badge
     * @param programId string id of the program
     * @returns promise
     */
    service.peerBadgeCompleted = function(programId) {
      return service.all("badges").one("isCompleted").get({filter: 'eventId=' + programId});
    }

    /**
     * registerMember Registers the given member for the given program.
     * @param userId string id of the member to be registered
     * @param programId string id of the program to be registered against
     * @returns promise
     */
    service.registerMember = function(userId, programId) {
      return service.one("memberCert/registrations", userId).one("programs", programId).post();
    }

    return service;    
  }
})();