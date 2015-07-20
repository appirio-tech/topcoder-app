(function() {
  'use strict';

  angular.module('tc.services').factory('ProfileService', ProfileService);

  ProfileService.$inject = ['CONSTANTS', 'ApiService', 'UserService'];

  function ProfileService(CONSTANTS, ApiService, UserService) {
    var service = {
      // for dashboard
      getUserProfile: getUserProfile,
      // for profile
      getMemberProfile: getMemberProfile
    };
    return service;

    ///////////////

    function getUserProfile() {
      return UserService.getUsername()
      .then(function(response) {
        return ApiService.requestHandler('GET', CONSTANTS.API_URL_V2 + '/users/' + response.data.handle);
      });
    }

    function getMemberProfile() {
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
