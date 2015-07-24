(function() {
  'use strict';

  angular.module('tc.services').factory('ProfileService', ProfileService);

  ProfileService.$inject = ['CONSTANTS', 'ApiService', 'UserService', '$q'];

  function ProfileService(CONSTANTS, ApiService, UserService, $q) {

    var restangular = ApiService.restangularV3;

    var service = {
      // primary, for global use
      getUserProfile: getUserProfile,
      getUserSkills: getUserSkills,
      getUserFinancials: getUserFinancials,
      getUserStats: getUserStats,
      // auxiliary functions for profile
      getNumProjects: getNumProjects,
      getNumWins: getNumWins,
      getRanks: getRanks,
      getTracks: getTracks,
      // for profile - to be deprecated
      getMockMemberProfile: getMockMemberProfile
    };
    return service;

    ///////////////

    function getUserProfile(userId) {
      userId = userId || UserService.getUserIdentity().userId;
      return restangular.one('members', userId).one('profile').get();
    }

    function getUserSkills(userId) {
      userId = userId || UserService.getUserIdentity().userId;
      return restangular.one('members', userId).one('skills').get();
    }

    function getUserFinancials(userId) {
      return restangular.one('members', userId).one('financial').get();
    }

    function getUserStats(userId) {
      userId = userId || UserService.getUserIdentity().userId;
      return restangular.one('members', userId).one('stats').get();
    }

    function getNumProjects(stats) {
      return stats.developStats.challenges +
             stats.designStats.challenges +
             stats.dataScienceStats.challenges;
    }

    function getNumWins(stats) {
      return stats.developStats.wins +
             stats.designStats.wins +
             stats.dataScienceStats.wins;
    }

    function getRanks(stats) {
      var dev = stats.developStats.rankStats.map(function(x) {
        return {
          'type': 'Develop',
          'subtype': x.phaseDesc,
          'rank': x.overallRank
        };
      });
      var des = stats.designStats.rankStats.map(function(x) {
        return {
          'type': 'Design',
          'subtype': x.phaseDesc,
          'rank': x.overallRank
        };
      });
      var srm = stats.dataScienceStats.srmStats.srmRankStats.map(function(x) {
        return {
          'type': 'Data Science',
          'subtype': 'SRM',
          'rank': x.rank
        };
      });
      var marathon = stats.dataScienceStats.marathonMatchStats.marathonRankStats.map(function(x) {
        return {
          'type': 'Data Science',
          'subtype': 'Marathon',
          'rank': x.rank
        };
      });
      var ans = dev.concat(des)
        .concat(srm)
        .concat(marathon)
        .filter(function(x) {
        return x.rank > 0;
      });
      return ans;
    }

    function getTracks(stats) {
      var tracks = [
        {
          'name': 'Develop',
          'challenges': stats.developStats.challenges,
        },
        {
          'name': 'Design',
          'challenges': stats.designStats.challenges,
        },
        {
          'name': 'Data Science',
          'challenges': stats.dataScienceStats.challenges,
        }
      ].filter(function(track) {
        return track.challenges > 0;
      }).map(function(track) {
        return track.name;
      });
      return tracks;
    }

    function getMockMemberProfile() {
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
