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
      getChallengeTypeStats: getChallengeTypeStats,
      getTracks: getTracks,
      getSubTracks: getSubTracks,
      // for profile - to be deprecated
      getMockMemberProfile: getMockMemberProfile
    };
    return service;

    ///////////////

    function getUserProfile(username) {
      return restangular.one('members', username).get();
    }

    function getUserSkills(username) {
      return restangular.one('members', username).one('skills').get();
    }

    function getUserFinancials(username) {
      return restangular.one('members', username).one('financial').get();
    }

    function getUserStats(username) {
      return restangular.one('members', username).one('stats').get();
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
      if (!stats) {
        return [];
      }
      var dev = [], des = [], srm = [], marathon = [];
      if (stats.developStats && stats.developStats.rankStats) {
        dev = stats.developStats.rankStats.map(function(x) {
          return {
            'track': 'Develop',
            'subTrack': x.subTrackName.trim(),
            'rank': x.overallRank
          };
        });
      }
      // show # of wins for design
      if (stats.designStats) {
        des = [
          {
            'track': 'Design',
            'subTrack': '',
            'rank': stats.designStats.wins
          }
        ];
      }
      if (stats.dataScienceStats && stats.dataScienceStats.srmStats && stats.dataScienceStats.srmStats.rankStats) {
        srm = stats.dataScienceStats.srmStats.rankStats.map(function(x) {
          return {
            'track': 'Data Science',
            'subTrack': 'SRM',
            'rank': x.rank
          };
        });
      }
      if (stats.dataScienceStats && stats.dataScienceStats.marathonMatchStats && stats.dataScienceStats.marathonMatchStats.rankStats) {
        marathon = stats.dataScienceStats.marathonMatchStats.rankStats.map(function(x) {
          return {
            'track': 'Data Science',
            'subTrack': 'Marathon',
            'rank': x.rank
          };
        });
      }
      var ans = dev.concat(des)
        .concat(srm)
        .concat(marathon)
        .filter(function(x) {
        return x.rank > 0;
      });
      return ans;
    }

    function getChallengeTypeStats(stats, track, type) {
      track = track.toLowerCase();
      if (track !== 'Data Science') {
        var ans = stats[track + 'Stats']['rankStats'].filter(function(x) {
          return type === x.subTrackName.toLowerCase().replace(/ /g, '');
        });
        ans[0].challenges = stats[track + 'Stats']['challengeStats'].filter(function(x) {
          return type === x.subTrackName.toLowerCase().replace(/ /g, '');
        })[0].challenges;
        ans[0].detailed = stats[track + 'Stats']['submissionStats'].filter(function(x) {
          return type === x.subTrackName.toLowerCase().replace(/ /g, '');
        })[0];
        return ans[0];
      } else if (type == 'srm') {
        return stats.dataScienceStats.srmStats.rankStats[0];
      } else {
        return stats.dataScienceStats.marathonMatchStats.rankStats[0];
      }
    }

    function getSubTracks(stats, track) {
        var ans = stats[track + 'Stats']['rankStats'].map(function(x) {
          return x.subTrackName;
        });
        return ans;
    }

    function getTracks(stats) {
      var tracks = [
        {
          'name': 'DEVELOP',
          'challenges': stats.developStats.challenges,
        },
        {
          'name': 'DESIGN',
          'challenges': stats.designStats.challenges,
        },
        {
          'name': 'DATA',
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
              "logo": "git-logo.png",
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
              "logo": "stackoverflow-logo.png",
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
