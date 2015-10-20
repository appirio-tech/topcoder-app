(function() {
  'use strict';

  angular.module('topcoder')
    .filter('challengeLinks', ['CONSTANTS', challengeLinks]);

  function challengeLinks(CONSTANTS) {
    return function(challenge, type) {
      if (challenge.subTrack === 'MARATHON_MATCH') {
        var data = {
          domain: CONSTANTS.domain,
          roundId: challenge.rounds[0].id,
          forumId: challenge.rounds[0].forumId
        };
        switch (type) {
          case 'forums':
            return String.supplant('https://apps.{domain}/forums/?module=ThreadList&forumID={forumId}', data);
          case 'registrants':
            return String.supplant('https://community.{domain}/longcontest/?module=ViewStandings&rd={roundId}', data);
          case 'detail':
            return String.supplant('https://community.{domain}/tc?module=MatchDetails&rd={roundId}', data);
        }
      } else {
        var data = {
          domain: CONSTANTS.domain,
          track: challenge.track,
          forumId: challenge.forumId,
          id: challenge.id
        };
        switch (type) {
          case 'forums':
            switch (challenge.track) {
              case 'DEVELOP':
                return String.supplant('https://apps.{domain}/forums/?module=Category&categoryID={forumId}', data);
              case 'DATA':
                return String.supplant('https://apps.{domain}/forums/?module=Category&categoryID={forumId}', data);
              case 'DESIGN':
                return String.supplant('https://apps.{domain}/forums/?module=ThreadList&forumId={forumId}', data);
            }

          case 'submissions':
          case 'registrants':
            return String.supplant('https://www.{domain}/challenge-details/{id}/?type={track}#viewRegistrant', data);
          case 'detail':
            return String.supplant('https://www.{domain}/challenge-details/{id}/?type={track}', data);
        }
      }
    }
  }
})();
