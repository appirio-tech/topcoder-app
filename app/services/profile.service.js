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

    function getMemberProfile() {
      if (!service.memberProfile) {
        service.memberProfile = {
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
          "state": "California",
          "longDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor.",
          "tags": ["Assembly", "Architecture", "Data Science", "Co-Pilot"],
          "numWins": 126,
          "numProjects": 132,
          "categories": [
            {
              "name": "Development",
              "subcategory": "Assembly",
              "rank": 23
            },
            {
              "name": "Development",
              "subcategory": "Architecture",
              "rank": 144
            },
            {
              "name": "Data Science",
              "subcategory": false,
              "rank": 3
            },
            {
              "name": "Co-Pilot Stats",
              "subcategory": false,
              "rank": 23
            }
          ],
          "skills": [
            {
              "name": "Javascript",
              "icon": "javascript-logo.png"
            },
            {
              "name": "NPM",
              "icon": "npm-logo.png"
            }
          ],
          "links": [
            {
              "name": "Github",
              "properties": [
                {
                  "name": "Repos",
                  "value": 20
                },
                {
                  "name": "Followers",
                  "value": 10
                }
              ]
            },
            {
              "name": "Stack Overflow",
              "properties": [
                {
                  "name": "Reputation",
                  "value": 200
                },
                {
                  "name": "Questions",
                  "value": 102
                },
                {
                  "name": "Answers",
                  "value": 2001
                }
              ]
            }
          ]
        };
      }
      return service.memberProfile;
    }
  }

})();
