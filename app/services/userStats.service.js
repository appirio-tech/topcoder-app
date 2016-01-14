/**
 * @brief UserStats service handles 'massaging' of user stats data.
 * @details Stats data is represented to the user in a myriad of ways.
 * Most of this logic is encapsulated here.
 */
(function() {
  'use strict';

  angular.module('tc.services').factory('UserStatsService', UserStatsService);
  UserStatsService.$inject = ['$filter'];

  function UserStatsService($filter) {

    var service = {
      getIterableStats: getIterableStats,
      processStats: processStats,
      compileSubtracks: compileSubtracks,
      filterStats: filterStats,
      processStatRank: processStatRank,
      mapReliability: mapReliability
    };

    var percentageFunc = function(n) { return $filter('percentage')(n);};
    var percentileFunc = function(n) { n /= 100; return $filter('percentage')(n);};
    var defaultPostFunc = function(n) { return $filter('number')(n); };

    var interestingData = {
      'DESIGN': [
        {key: 'wins', label: 'wins', postFunc: null},
        {key: 'challenges', label: 'challenges', postFunc: null}
      ],
      'DEVELOP': [
        {key: 'rank.rating', label: 'rating', postFunc: null},
        {key: 'rank.overallRank', label: 'rank', postFunc: null},
        {key: 'rank.overallPercentile', label: 'percentile', postFunc: percentileFunc},
        {key: 'submissions.submissions', label: 'challenges', postFunc: null},
        {key: 'wins', label: 'wins', postFunc: null},
        {key: 'rank.reliability', label: 'reliability', postFunc: percentageFunc}
      ],
      'DATA_SCIENCE.SRM': [
        {key: 'rank.rating', label: 'rating', postFunc: null},
        {key: 'rank.rank', label: 'rank', postFunc: null},
        {key: 'rank.percentile', label: 'percentile', postFunc: percentileFunc},
        {key: 'challenges', label:'competitions', postFunc: null}
      ],
      'DATA_SCIENCE.MARATHON_MATCH': [
        {key: 'rank.rating', label: 'rating', postFunc: null},
        {key: 'rank.rank', label: 'rank', postFunc: null},
        {key: 'rank.percentile', label: 'percentile', postFunc: percentileFunc},
        {key: 'wins', label:'wins', postFunc: null}
      ],
      'COPILOT': [
        {key: 'activeContests', label: 'active challenges', postFunc: null},
        {key: 'activeProjects', label: 'active projects', postFunc: null},
        {key: 'contests', label: 'total challenges', postFunc: null},
        {key: 'projects', label: 'total projects', postFunc: null},
        {key: 'fulfillment', label: 'fulfillment', postFunc: percentileFunc}
      ]
    };
    return service;

    function getIterableStats(track, subTrack, stats) {
       // helper functions


      var obj;
      // data science stats are nested in a funky way
      if (track === 'COPILOT') {
        obj = _.get(stats, 'COPILOT', null);
      } else if (track === 'DATA_SCIENCE') {
        obj = _.get(stats, "DATA_SCIENCE." + subTrack, null);
      } else {
        var _subTrackStats = _.get(stats, track+'.subTracks', []);
        obj = _.find(_subTrackStats, function(n) {
          return n.name === subTrack
        });
      }
      // no stats to iterate over
      if (!obj)
        return [];
      // For each type of track retrieve the more interesting
      var data;
      switch(track) {
        case 'DATA_SCIENCE':
          data = interestingData[track+"."+subTrack];
          break;
        default:
          data = interestingData[track];
      }
      var _iterStats = [];
      data.forEach(function(k) {
        var _val = _.get(obj, k.key);
        if (_val)
          _val = k.postFunc ? k.postFunc(_val) : defaultPostFunc(_val);
        _iterStats.push({label: k.label, val: _val});
      });
      return _iterStats;
    }

    function compileSubtracks(trackRanks) {
      return _.reduce(trackRanks, function(result, subtracks, track) {
        if (Array.isArray(subtracks) && subtracks.length) {
          if (track === 'DEVELOP') {
            var filtered = _.filter(subtracks, function(subtrackObj) {
              return subtrackObj.subTrack !== 'COPILOT_POSTING';
            });
            return result.concat(filtered);
          }

          return result.concat(subtracks);

        } else {
          return result;
        }
      }, []);
    }

    function processStatRank(rank) {
      rank.showStats = true;
      if (rank.track === 'DESIGN') {
        rank.stat = rank.wins;
        rank.statType = 'Wins';
        // for non rated tracks, use submissions to filter out empty values
        if(!rank.submissions) {
          rank.showStats = false;
        }
      } else if (rank.track === 'COPILOT') {
        rank.stat = rank.activeContests;
        rank.statType = 'Challenges';
      } else if (rank.track === 'DEVELOP') {
        if (['CODE', 'FIRST_2_FINISH', 'BUG_HUNT'].indexOf(rank.subTrack) != -1) {
          rank.stat = rank.wins;
          rank.statType = 'Wins';
          // for non rated tracks, use submissions to filter out empty values
          if(!rank.submissions) {
            rank.showStats = false;
          }
        } else {
          rank.stat = rank.rating;
          rank.statType = 'Rating';
        }
      } else {
        rank.stat = rank.rating;
        rank.statType = 'Rating';
      }
    }

    function processStats(ranks) {
      angular.forEach(ranks, function(rank) {
        processStatRank(rank);
      });
    }

    function filterStats(ranks) {
      var filtered = [];
      angular.forEach(ranks, function(rank) {
        if (rank.showStats) {
          filtered.push(rank);
        }
      });
      return filtered;
    }

    function mapReliability(subTrack) {
      var reliabilityMapping = {
        'DESIGN': 1,
        'DEVELOPMENT': 2,
        'TESTING_COMPETITION': 5,
        'SPECIFICATION': 6,
        'ARCHITECTURE': 7,
        'COMPONENT_PRODUCTION': 8,
        'BUG_HUNT': 9,
        'DEPLOYMENT': 10,
        'SECURITY': 11,
        'PROCESS': 12,
        'TEST_SUITES': 13,
        'ASSEMBLY_COMPETITION': 14,
        'LEGACY': 15,
        'BANNERS_OR_ICONS': 16,
        'WEB_DESIGN': 17,
        'WIREFRAMES': 18,
        'UI_PROTOTYPE_COMPETITION': 19,
        'LOGO_DESIGN': 20,
        'PRINT_OR_PRESENTATION': 21,
        'CONCEPTUALIZATION': 23,
        'RIA_BUILD_COMPETITION': 24,
        'RIA_COMPONENT_COMPETITION': 25,
        'TEST_SCENARIOS': 26,
        'SPEC_REVIEW': 27,
        'GENERIC_SCORECARDS': 28,
        'COPILOT_POSTING': 29,
        'CONTENT_CREATION': 35,
        'WIDGET_OR_MOBILE_SCREEN_DESIGN': 30,
        'FRONT_END_FLASH': 31,
        'APPLICATION_FRONT_END_DESIGN': 32,
        'STUDIO_OTHER': 34,
        'IDEA_GENERATION': 22,
        'REPORTING': 36,
        'MARATHON_MATCH': 37,
        'FIRST_2_FINISH': 38,
        'CODE': 39,
        'DESIGN_FIRST_2_FINISH': 40
      };

      return reliabilityMapping[subTrack] || 2;
    }
  }

})();
