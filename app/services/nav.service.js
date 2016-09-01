import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('NavService', NavService)

  NavService.$inject = ['CONSTANTS', '$state', 'UserService', 'TcAuthService']

  function NavService(CONSTANTS, $state, UserService, TcAuthService) {

    var service = {
      selectedTopLevelItem: null,
      getParent: getParent
    }

    service.menuLinks = {
      'compete': [
          { 'href':  '/challenges/design/active/?pageIndex=1', 'text': 'DESIGN CHALLENGES', 'icon': require('../../assets/images/nav/track-design.svg') },
          { 'href':  '/challenges/develop/active/?pageIndex=1', 'text': 'DEVELOPMENT CHALLENGES', 'icon': require('../../assets/images/nav/track-develop.svg') },
          { 'href':  '/challenges/data/active/?pageIndex=1', 'text': 'DATA SCIENCE CHALLENGES', 'icon': require('../../assets/images/nav/track-data.svg') },
          { 'href':  CONSTANTS.ARENA_URL, 'text': 'COMPETITIVE PROGRAMMING', 'icon': require('../../assets/images/nav/track-cp.svg'), 'target': '_blank' }
      ],
      'learn': [
          { 'href': '/getting-started/', 'text': 'GETTING STARTED', 'icon': require('../../assets/images/nav/rocket.svg') },
          { 'href': '/community/design/', 'text': 'DESIGN', 'icon': require('../../assets/images/nav/book-design.svg') },
          { 'href': '/community/development/', 'text': 'DEVELOPMENT', 'icon': require('../../assets/images/nav/book-develop.svg') },
          { 'href': '/community/data-science/', 'text': 'DATA SCIENCE', 'icon': require('../../assets/images/nav/book-data.svg') },
          { 'href': '/community/competitive%20programming/', 'text': 'COMPETITIVE PROGRAMMING', 'icon': require('../../assets/images/nav/book-cp.svg') }
      ],
      'community': [
          { 'sref': 'community.members', 'text': 'OVERVIEW', 'icon': require('../../assets/images/nav/members.svg') },
          { 'href': CONSTANTS.TCO17_URL, 'text': 'TCO17', 'icon': require('../../assets/images/nav/tco-generic.svg'), 'target': '_blank' },
          { 'href': '/community/member-programs/', 'text': 'PROGRAMS', 'icon': require('../../assets/images/nav/programs.svg') },
          { 'href': CONSTANTS.FORUMS_APP_URL, 'text': 'FORUMS', 'icon': require('../../assets/images/nav/forums.svg') },
          { 'sref': 'community.statistics', 'text': 'STATISTICS', 'icon': require('../../assets/images/nav/statistics.svg') },
          { 'href': '/community/events/', 'text': 'EVENTS', 'icon': require('../../assets/images/nav/events.svg') },
          { 'href': '/blog/', 'text': 'BLOG', 'icon': require('../../assets/images/nav/blog.svg') } 
      ]
    }

    var userSrefs = [
      {'href': 'profile'},
      {'href': 'settings'},
      {'href': 'my-dashboard'},
      {'href': 'dashboard'},
      {'href': 'my-challenges'}
    ]

    service.hrefs = {}

    service.menuLinks.compete.forEach(function(link) {
      link.parent = 'compete'
      service.hrefs[link.href] = link
    })

    service.menuLinks.learn.forEach(function(link) {
      link.parent = 'learn'
      service.hrefs[link.href] = link
    })

    service.menuLinks.community.forEach(function(link) {
      link.parent = 'community'
      service.hrefs[link.href] = link
    })

    userSrefs.forEach(function(link) {
      link.parent = 'user'
      service.hrefs[link.href] = link
    })

    function getParent(ref) {
      if (ref.indexOf('.') >= 0) {
        ref = ref.slice(0, ref.indexOf('.'))
      }

      if (ref.match(/profile/)) {
        if (TcAuthService.isAuthenticated() && $state.params && $state.params.userHandle == UserService.getUserIdentity().handle) {
          return 'user'
        } else {
          return 'community'
        }
      } else {
        return service.hrefs[ref] && service.hrefs[ref].parent
      }
    }

    return service
  }
})()
