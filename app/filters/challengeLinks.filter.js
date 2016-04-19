import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder')
    .filter('challengeLinks', ['CONSTANTS', challengeLinks])

  function challengeLinks(CONSTANTS) {
    return function(challenge, type) {
      var data
      if (challenge.subTrack === 'MARATHON_MATCH') {
        data = {
          domain: CONSTANTS.domain,
          roundId: challenge.rounds[0].id,
          forumId: challenge.rounds[0].forumId
        }
        switch (type) {
        case 'forums':
          return String.supplant('https://apps.{domain}/forums/?module=ThreadList&forumID={forumId}', data)
        case 'registrants':
          return String.supplant('https://community.{domain}/longcontest/?module=ViewRegistrants&rd={roundId}', data)
        case 'detail':
          if (challenge.status === 'PAST') {
            return String.supplant('https://community.{domain}/longcontest/stats/?module=ViewOverview&rd={roundId}', data)
          } else { // for all other statues (ACTIVE, UPCOMING), show the problem statement
            return String.supplant('https://community.{domain}/longcontest/?module=ViewProblemStatement&rd={roundId}', data)
          }
        }
      } else {
        data = {
          domain: CONSTANTS.domain,
          track: challenge.track.toLowerCase(),
          forumId: challenge.forumId,
          id: challenge.id
        }
        switch (type) {
        case 'forums':
          switch (challenge.track.toLowerCase()) {
          case 'develop':
            return String.supplant('https://apps.{domain}/forums/?module=Category&categoryID={forumId}', data)
          case 'data':
            return String.supplant('https://apps.{domain}/forums/?module=Category&categoryID={forumId}', data)
          case 'design':
            return String.supplant('https://apps.{domain}/forums/?module=ThreadList&forumID={forumId}', data)
          }
        /*eslint no-fallthrough:0*/
        case 'submissions':
          return String.supplant('https://www.{domain}/challenge-details/{id}/?type={track}#submissions', data)
        case 'registrants':
          return String.supplant('https://www.{domain}/challenge-details/{id}/?type={track}#viewRegistrant', data)
        case 'detail':
          return String.supplant('https://www.{domain}/challenge-details/{id}/?type={track}', data)
        }
      }
    }
  }
})()
