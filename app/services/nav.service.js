(function() {
  'use strict';

  angular.module('tc.services').factory('NavService', NavService);

  NavService.$inject = ['CONSTANTS', '$state', 'UserService', 'TcAuthService'];

  function NavService(CONSTANTS, $state, UserService, TcAuthService) {

    var service = {

      selectedTopLevelItem: null,
      getParent: getParent

    };

    service.menuLinks = {
      'compete': [
          { 'href':  "/challenges/design/active/", 'text': 'DESIGN CHALLENGES', 'icon': '/images/nav/design.svg' },
          { 'href':  "/challenges/develop/active", 'text': 'DEVELOPMENT CHALLENGES', 'icon': '/images/nav/development.svg' },
          { 'href':  "/challenges/data/active", 'text': 'DATA SCIENCE CHALLENGES', 'icon': '/images/nav/data-science.svg' },
          { 'href':  CONSTANTS.ARENA_URL, 'text': 'THE ARENA', 'icon': '/images/nav/srms.svg', 'target': '_blank' },
      ],
      'learn': [
          { 'href': '/community/design/', 'text': 'DESIGN', 'icon': '/images/nav/scroll-design.svg' },
          { 'href': '/community/development/', 'text': 'DEVELOPMENT', 'icon': '/images/nav/scroll-develop.svg' },
          { 'href': '/community/data-science/', 'text': 'DATA SCIENCE', 'icon': '/images/nav/scroll-data.svg' },
          { 'href': '/community/competitive%20programming/', 'text': 'COMPETITIVE PROGRAMMING', 'icon': '/images/nav/srms.svg' },
      ],
      'community': [
          { 'href': '/community/members/', 'text': 'MEMBERS', 'icon': '/images/nav/users.svg' },
          { 'href': '/community/member-programs/', 'text': 'PROGRAMS', 'icon': '/images/nav/medal.svg' },
          { 'href': CONSTANTS.FORUMS_APP_URL, 'text': 'FORUMS', 'icon': '/images/nav/forum.svg', 'target': '_blank' },
          { 'href': '/community/statistics/', 'text': 'STATISTICS', 'icon': '/images/nav/statistics.svg' },
          { 'href': '/community/events/', 'text': 'EVENTS', 'icon': '/images/nav/calendar.svg' },
          { 'href': '/blog/', 'text': 'BLOG', 'icon': '/images/nav/blog.svg' }
      ]
    };

    var userSrefs = [
      {'href': 'profile'},
      {'href': 'settings'},
      {'href': 'my-dashboard'},
      {'href': 'dashboard'},
      {'href': 'my-challenges'}
    ];

    service.hrefs = {};
    service.menuLinks.compete.forEach(function(link) {
      link.parent = 'compete';
      service.hrefs[link.href] = link;
    });

    service.menuLinks.learn.forEach(function(link) {
      link.parent = 'learn';
      service.hrefs[link.href] = link;
    });

    service.menuLinks.community.forEach(function(link) {
      link.parent = 'community';
      service.hrefs[link.href] = link;
    });

    userSrefs.forEach(function(link) {
      link.parent = 'user';
      service.hrefs[link.href] = link;
    });

    function getParent(ref) {
      if (ref.indexOf('.') >= 0)
        ref = ref.slice(0, ref.indexOf('.'));

      if (ref.match(/profile/)) {
        if (TcAuthService.isAuthenticated() && $state.params && $state.params.userHandle == UserService.getUserIdentity().handle) {
          return 'user';
        } else {
          return 'community';
        }
      } else {
        return service.hrefs[ref] && service.hrefs[ref].parent;
      }
    }


    return service;

  }

})();
