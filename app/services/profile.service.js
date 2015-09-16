(function() {
  'use strict';

  angular.module('tc.services').factory('ProfileService', ProfileService);

  ProfileService.$inject = ['CONSTANTS', 'ApiService', 'UserService', '$q'];

  function ProfileService(CONSTANTS, ApiService, UserService, $q) {

    var restangular = ApiService.restangularV3;

    var service = {
      // primary, for global use
      getUserProfile: getUserProfile,
      updateUserProfile: updateUserProfile,

      getUserSkills: getUserSkills,
      addUserSkill: addUserSkill,
      hideUserSkill: hideUserSkill,

      getUserFinancials: getUserFinancials,
      getUserStats: getUserStats,
      getDistributionStats: getDistributionStats,
      getHistoryStats: getHistoryStats,
      // auxiliary functions for profile
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

    function updateUserProfile(userData) {
      return userData.save();
    }

    function getUserSkills(username) {
      return restangular.one('members', username).one('skills').get();
    }

    function addUserSkill(username, skillTagId) {
      var body = { skills: {} };
      body['skills'][skillTagId] = { 'hidden': false };
      return restangular.one('members', username).one('skills').patch(body);
    }

    function hideUserSkill(username, skillTagId) {
      var body = { skills: {} };
      body['skills'][skillTagId] = { 'hidden': true };
      return restangular.one('members', username).one('skills').patch(body);
    }

    function getUserFinancials(username) {
      return restangular.one('members', username).one('financial').get();
    }

    function getUserStats(username) {
      var deferred = $q.defer();
      restangular.one('members', username).one('stats').get().then(function(data) {
        if (!data.DEVELOP) data.DEVELOP = {challenges: 0, wins: 0, subTracks: []};
        if (!data.DESIGN) data.DESIGN = {challenges: 0, wins: 0, subTracks: []};
        if (!data.DATA_SCIENCE) data.DATA_SCIENCE = {challenges: 0, wins: 0, SRM: {}, MARATHON_MATCH: {}};
        deferred.resolve(data);
      });
      return deferred.promise;
    }

    function getDistributionStats(track, subTrack) {
      return restangular.one('members').one('stats').one('distribution').get({
        'filter': 'track=' + track + '&subTrack=' + subTrack
      });
    }

    function getHistoryStats(handle) {
      return restangular.one('members', handle).one('stats').one('history').get();
    }

    function getRanks(stats) {
      if (!stats) {
        return [];
      }
      var dev = [], design = [], srm = [], marathon = [], copilot = [];
      if (stats.DEVELOP && stats.DEVELOP.subTracks) {
        dev = stats.DEVELOP.subTracks.map(function(subTrack) {
          return {
            'track': 'DEVELOP',
            'subTrack': subTrack.name,
            'rank': subTrack.rank ? subTrack.rank.overallRank : 0,
            'wins': subTrack.wins
          };
        });
      }
      // show # of wins for design
      if (stats.DESIGN && stats.DESIGN.subTracks) {
        design = stats.DESIGN.subTracks.map(function(subTrack) {
          return {
            'track': 'DESIGN',
            'subTrack': subTrack.name,
            'rank': false,
            'wins': subTrack.wins
          };
        });
      }
      if (stats.DATA_SCIENCE && stats.DATA_SCIENCE.SRM && stats.DATA_SCIENCE.SRM.rank) {
        var srmStats = stats.DATA_SCIENCE.SRM;
        srm = {
          'track': 'DATA_SCIENCE',
          'subTrack': 'SRM',
          'rank': srmStats.rank.rating
        };
      }
      if (stats.DATA_SCIENCE && stats.DATA_SCIENCE.MARATHON_MATCH && stats.DATA_SCIENCE.MARATHON_MATCH.rank) {
        var marathonStats = stats.DATA_SCIENCE.MARATHON_MATCH;
        marathon = {
          'track': 'DATA_SCIENCE',
          'subTrack': 'MARATHON',
          'rank': marathonStats.rank.rating
        };
      }
      if (stats.COPILOT) {
        copilot = stats.COPILOT;
        copilot.track = 'Co-Pilot';
      }
      var ans = {
        'DEVELOP': removeRankless(dev),
        'DESIGN': removeRankless(design),
        'MARATHON': marathon,
        'SRM': srm,
        'CO_PILOT': copilot
      };

      function removeRankless(arr) {
        return arr
          .filter(function(subTrack) {
            return subTrack && (subTrack.rank || subTrack.wins || subTrack.fulfillment);
          });
      }
      return ans;
    }

    function getChallengeTypeStats(stats, track, type) {
      track = track.toUpperCase().replace(/ /g, '_');
      track = track.replace(/-/g, '');
      type = type.toUpperCase().replace(/ /g, '_');
      type = type.replace(/-/g, '');
      if (track == 'DEVELOP') {
        var ans = stats.DEVELOP.subTracks.filter(function(subTrack) {
          return type === subTrack.name;
        });
        return ans[0];
      } else if (track == 'DESIGN') {
        var ans = stats.DESIGN.subTracks.filter(function(subTrack) {
          return type === subTrack.name;
        });
        return ans[0];
      } else if (track == 'COPILOT') {
        var ans = stats.COPILOT;
        return ans;
      } else if (type == 'SRM') {
        return stats.DATA_SCIENCE.SRM;
      } else {
        return stats.DATA_SCIENCE.MARATHON_MATCH;
      }
    }

    function getSubTracks(stats, track) {
      track = track.toUpperCase().replace(/ /g, '_');
      track = track.replace(/-/g, '');
      if (track == 'DEVELOP') {
        var ans = stats.DEVELOP.subTracks.map(function(subTrack) {
          return subTrack.name;
        });
        return ans;
      } else if (track == 'DESIGN') {
        var ans = stats.DESIGN.subTracks.map(function(subTrack) {
          return subTrack.name;
        });
        return ans;
      } else {
        return [];
      }
    }

    function getTracks(stats) {
      var tracks = [
        {
          'name': 'DEVELOP',
          'challenges': stats.DEVELOP.challenges,
        },
        {
          'name': 'DESIGN',
          'challenges': stats.DESIGN.challenges,
        },
        {
          'name': 'DATA_SCIENCE',
          'challenges': stats.DATA_SCIENCE.challenges,
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
