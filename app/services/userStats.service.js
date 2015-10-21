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
      getIterableStats: getIterableStats
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
      ]
    };
    return service;

    function getIterableStats(track, subTrack, stats) {
       // helper functions


      var obj;
      // data science stats are nested in a funky way
      if (track === 'DATA_SCIENCE') {
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
            _.remove(subtracks, function(subtrackObj) {
              return subtrackObj.subTrack === 'COPILOT_POSTING';
            });
          }

          return result.concat(subtracks);

        } else {
          return result;
        }
      }, []);
    }

    function processStats(subtrackRanks) {
      angular.forEach(subtrackRanks, function(subtrack) {
        if (subtrack.track === 'DESIGN') {
          subtrack.stat = subtrack.wins;
          subtrack.statType = 'Wins';
        } else if (subtrack.track === 'COPILOT') {
          subtrack.stat = subtrack.activeContests;
          subtrack.statType = 'Challenges';
        } else {
          subtrack.stat = subtrack.rating;
          subtrack.statType = 'Rating';
        }
      });
    }


  }

})();
