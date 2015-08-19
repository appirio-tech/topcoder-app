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
      var deferred = $q.defer();
      restangular.one('members', username).one('stats').get().then(function(data) {
        if (!data.DEVELOP) data.DEVELOP = {challenges: 0, wins: 0, subTracks: []};
        if (!data.DESIGN) data.DESIGN = {challenges: 0, wins: 0, subTracks: []};
        if (!data.DATA_SCIENCE) data.DATA_SCIENCE = {challenges: 0, wins: 0, srm: {}, marathonMatch: {}};
        deferred.resolve(data);
      });
      return deferred.promise;
    }

    function getNumProjects(stats) {
      return stats.DEVELOP.challenges +
             stats.DESIGN.challenges +
             stats.DATA_SCIENCE.challenges;
    }

    function getNumWins(stats) {
      return stats.DEVELOP.wins +
             stats.DESIGN.wins +
             stats.DATA_SCIENCE.wins;
    }

    function getRanks(stats) {
      if (!stats) {
        return [];
      }
      var dev = [], design = [], srm = [], marathon = [], copilot = [];
      if (stats.DEVELOP && stats.DEVELOP.subTracks) {
        dev = stats.DEVELOP.subTracks.map(function(subTrack) {
          return {
            'track': 'Develop',
            'subTrack': subTrack.name,
            'rank': subTrack.rank
          };
        });
      }
      // show # of wins for design
      if (stats.DESIGN && stats.DESIGN.subTracks) {
        design = stats.DESIGN.subTracks.map(function(subTrack) {
          return {
            'track': 'Design',
            'subTrack': subTrack.name,
            'rank': false,
            'wins': subTrack.wins
          };
        });
      }
      if (stats.DATA_SCIENCE && stats.DATA_SCIENCE.srm && stats.DATA_SCIENCE.srm.rank) {
        var srmStats = stats.DATA_SCIENCE.srm;
        srm = {
          'track': 'Data Science',
          'subTrack': 'SRM',
          'rank': srmStats.rank.rank
        };
      }
      if (stats.DATA_SCIENCE && stats.DATA_SCIENCE.marathonMatch && stats.DATA_SCIENCE.marathonMatch.rank) {
        var marathonStats = stats.DATA_SCIENCE.marathonMatch;
        marathon = {
          'track': 'Data Science',
          'subTrack': 'Marathon',
          'rank': marathonStats.rank.rank
        };
      }
      if (stats.COPILOT) {
        copilot = stats.COPILOT;
        copilot.track = 'Co-Pilot';
      }
      var ans = dev.concat(design)
        .concat(srm)
        .concat(marathon)
        .concat(stats.copilotStats)
        .filter(function(subTrack) {
          return subTrack && (subTrack.rank || subTrack.wins || subTrack.fulfillment);
        });
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
        return stats.DATA_SCIENCE.srm;
      } else {
        return stats.DATA_SCIENCE.marathonMatch;
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
