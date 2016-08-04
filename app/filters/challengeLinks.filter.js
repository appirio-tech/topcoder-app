import angular from 'angular'
import _ from 'lodash'

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
          forumId: challenge.rounds[0].forumId,
          componentId: _.get(challenge, 'componentId', ''),
          challengeId: challenge.id,
          problemId: _.get(challenge, 'problemId', '')
        }
        switch (type) {
        case 'forums':
          return String.supplant('https://apps.{domain}/forums/?module=ThreadList&forumID={forumId}', data)
        case 'registrants':
          return String.supplant('https://community.{domain}/longcontest/?module=ViewRegistrants&rd={roundId}', data)
        case 'submit':
          return String.supplant('https://community.{domain}/longcontest/?module=Submit&compid={componentId}&rd={roundId}&cd={challengeId}', data)
        case 'detail':
          if (challenge.status === 'PAST') {
            return String.supplant('https://community.{domain}/longcontest/stats/?module=ViewOverview&rd={roundId}', data)
          } else { // for all other statues (ACTIVE, UPCOMING), show the problem statement
            return String.supplant('https://community.{domain}/longcontest/?module=ViewProblemStatement&pm={problemId}&rd={roundId}', data)
          }
        }
      } else if (challenge.subTrack === 'SRM') {
        data = {
          domain: CONSTANTS.domain,
          roundId: challenge.rounds[0].id
        }
        switch (type) {
        case 'detail':
          return String.supplant('https://community.{domain}/stat?c=round_overview&rd={roundId}', data)
        }
      } else {
        data = {
          domain: CONSTANTS.domain,
          subdomain: location.href.search('//members') ? 'members' : 'www',
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
          return String.supplant('https://{subdomain}.{domain}/challenge-details/{id}/?type={track}#submissions', data)
        case 'registrants':
          return String.supplant('https://{subdomain}.{domain}/challenge-details/{id}/?type={track}#viewRegistrant', data)
        case 'submit':// TODO use details link for submit, we can replace it with new submission page url
          return String.supplant('https://{subdomain}.{domain}/challenge-details/{id}/?type={track}', data)
        case 'detail':
          return String.supplant('https://{subdomain}.{domain}/challenge-details/{id}/?type={track}', data)
        }
      }
    }
  }
})()
