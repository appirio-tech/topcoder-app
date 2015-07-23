(function() {
  'use strict';

  angular.module('tc.services').factory('ProfileService', ProfileService);

  ProfileService.$inject = ['CONSTANTS', 'ApiService', 'UserService', '$q'];

  function ProfileService(CONSTANTS, ApiService, UserService, $q) {

    var restangular = ApiService.restangularV3;

    var service = {
      getUserStats: getUserStats,
      getUserFinancials: getUserFinancials,
      // for dashboard
      getUserProfile: getUserProfile,
      // for profile - to be deprecated
      getMemberProfile: getMemberProfile
    };
    return service;

    ///////////////

    function getUserProfile(userId) {
      return restangular.one('members', userId).one('profile').get();
    }

    function getUserStats(userId) {
      return restangular.one('members', userId).one('stats').get();
    }

    function getUserFinancials(userId) {
      // TODO - Financial api endpoint needs to be updated to accept userId
      // in the mean time...
      // return restangular.one('members', userId).one('financial').get();
      return restangular.all('members').one('financial').get();
    }

    function getMemberProfile(userId) {
      var profile = {
        "updatedAt": "2015-07-10T01:40Z",
        "createdAt": "2001-07-24T16:44Z",
        "createdBy": null,
        "updatedBy": null,
        "firstName": "F_NAME",
        "lastName": "L_NAME",
        "otherLangName": "NIAL",
        "handle": "rakesh",
        "email": "email@domain.com.z",
        "description": "abc",
        "tracks": [
          "design",
          "develop",
          "data science"
        ],
        "streetAddr1": "123",
        "streetAddr2": "456",
        "city": "hello",
        "zip": "12345",
        "stateCode": "null",
        "homeCountryCode": "840",
        "competitionCountryCode": "840",
        "homeCountry": "United States",
        "competitionCountry": "United States",
        "photo": {
          "imageId": 22202176,
          "photoUrl": "abc"
        },
        "registrationTypeId": 1,
        "state": "California"
      };
      return profile;
    }
  }

})();
