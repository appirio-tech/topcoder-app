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
      updateUserSkills: updateUserSkills,
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
      getDivisions: getDivisions,
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

    function updateUserSkills(username, skills) {
      var body = { "skills": skills };
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
      return restangular.one('members', username).one('stats').get().then(function(data) {
        if (!data.DEVELOP) data.DEVELOP = {challenges: 0, wins: 0, subTracks: []};
        if (!data.DESIGN) data.DESIGN = {challenges: 0, wins: 0, subTracks: []};
        if (!data.DATA_SCIENCE) data.DATA_SCIENCE = {challenges: 0, wins: 0, SRM: {}, MARATHON_MATCH: {}};
        return data;
      });
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
      var dev = [], design = [], dataScience = [], copilot = [];

      if (stats.DEVELOP && stats.DEVELOP.subTracks) {
        dev = stats.DEVELOP.subTracks.map(function(subTrack) {
          return {
            'track': 'DEVELOP',
            'subTrack': subTrack.name,
            'rank': subTrack.rank ? subTrack.rank.overallRank : 0,
            'rating': subTrack.rank.rating || 0,
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
        dataScience.push({
          'track': 'DATA_SCIENCE',
          'subTrack': 'SRM',
          'rank': srmStats.rank.rank,
          'rating': srmStats.rank.rating
        });
      }
      if (stats.DATA_SCIENCE && stats.DATA_SCIENCE.MARATHON_MATCH && stats.DATA_SCIENCE.MARATHON_MATCH.rank) {
        var marathonStats = stats.DATA_SCIENCE.MARATHON_MATCH;
        dataScience.push({
          'track': 'DATA_SCIENCE',
          'subTrack': 'MARATHON_MATCH',
          'rank': marathonStats.rank.rank,
          'rating': marathonStats.rank.rating
        });
      }
      if (stats.COPILOT) {
        copilot =  [
          stats.COPILOT
        ];
        stats.COPILOT.track = 'COPILOT';
        stats.COPILOT.subTrack = 'COPILOT';
      }
      var compiledStats = {
        'DEVELOP': removeRankless(dev),
        'DESIGN': removeRankless(design),
        'DATA_SCIENCE': removeRankless(dataScience),
        'COPILOT': copilot
      };

      function removeRankless(arr) {
        return arr.filter(function(subTrack) {
          return subTrack && (subTrack.rank || subTrack.rating || subTrack.wins || subTrack.fulfillment);
        });
      }

      return compiledStats;
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
      } else if (track == 'DESIGN' && !_.isUndefined(stats.DESIGN) ) {
        var ans = stats.DESIGN.subTracks.filter(function(subTrack) {
          return type === subTrack.name;
        });
        return ans[0];
      } else if (track == 'COPILOT') {
        var ans = stats.COPILOT;
        return ans;
      } else if (type == 'SRM') {
        if (stats.DATA_SCIENCE.SRM.history) {
          stats.DATA_SCIENCE.SRM.history.map(function(point) {
            point.ratingDate = point.date;
            point.newRating = point.rating;
          });
          stats.DATA_SCIENCE.SRM.history.sort(function(x, y) {
            return moment(x.date).toDate() - moment(y.date).toDate();
          });
        }
        return stats.DATA_SCIENCE.SRM;
      } else {
        if (stats.DATA_SCIENCE.MARATHON_MATCH.history) {
          stats.DATA_SCIENCE.MARATHON_MATCH.history.map(function(point) {
            point.ratingDate = point.date;
            point.newRating = point.rating;
          });
          stats.DATA_SCIENCE.MARATHON_MATCH.history.sort(function(x, y) {
            return moment(x.date).toDate() - moment(y.date).toDate();
          });
        }

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

    function getDivisions(stats) {
      stats = stats.DATA_SCIENCE.SRM;
      function toObject(array) {
        var ans = {};
        ans.total = {
          problemsSuccessful: 0,
          problemsFailed: 0,
          problemsSubmitted: 0,
          problemsSysByTest: 0
        };
        array.forEach(function(level) {
          level.problemsSuccessful = level.problemsSubmitted - level.problemsFailed;
          ans.total.problemsSuccessful += level.problemsSuccessful;
          ans.total.problemsFailed += level.problemsFailed;
          ans.total.problemsSubmitted += level.problemsSubmitted;
          ans.total.problemsSysByTest += level.problemsSysByTest;
          ans[level.levelName] = level;
        });
        ans.levels = [];
        if (ans['Level One']) ans.levels.push(ans['Level One']);
        if (ans['Level Two']) ans.levels.push(ans['Level Two']);
        if (ans['Level Three']) ans.levels.push(ans['Level Three']);
        return ans;
      }
      return {
        division1: toObject(stats.division1),
        division2: toObject(stats.division2),
        challenges: toObject(stats.challengeDetails)
      };
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
