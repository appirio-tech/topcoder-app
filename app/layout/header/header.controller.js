(function() {
  'use strict';

  angular.module('tc.layout').controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$state', 'TcAuthService', 'CONSTANTS', '$log', '$rootScope', 'UserService', 'ProfileService', 'IntroService'];

  function HeaderController($state, TcAuthService, CONSTANTS, $log, $rootScope, UserService, ProfileService, IntroService) {
    var vm = this;

    vm.constants = CONSTANTS;
    vm.domain = CONSTANTS.domain;
    vm.login = TcAuthService.login;
    vm.logout = logout;
    vm.checkSubmit = checkSubmit;
    vm.searchTerm = '';

    vm.menuLinks =
    {
      'compete': [
          { 'href':  "/challenges/design/active/", 'text': 'DESIGN CHALLENGES', 'icon': '/images/nav/design.svg' },
          { 'href':  "/challenges/develop/active", 'text': 'DEVELOPMENT CHALLENGES', 'icon': '/images/nav/development.svg' },
          { 'href':  "/challenges/data/active", 'text': 'DATA SCIENCE CHALLENGES', 'icon': '/images/nav/data-science.svg' },
          { 'href':  vm.constants.ARENA_URL, 'text': 'THE ARENA', 'icon': '/images/nav/srms.svg' },
      ],
      'learn': [
          { 'href': '/community/design/', 'text': 'DESIGN', 'icon': '/images/nav/scroll-design.svg' },
          { 'href': '/community/development/', 'text': 'DEVELOPMENT', 'icon': '/images/nav/scroll-develop.svg' },
          { 'href': '/community/data-science/', 'text': 'DATA SCIENCE', 'icon': '/images/nav/scroll-data.svg' },
          { 'href': '/community/competitive%20programming/', 'text': 'COMPETITIVE PROGRAMMING', 'icon': '/images/nav/srms.svg' },
      ],
      'community': [
          { 'sref': 'community.members', 'text': 'MEMBERS', 'icon': '/images/nav/users.svg' },
          { 'href': '/community/member-programs/', 'text': 'PROGRAMS', 'icon': '/images/nav/medal.svg' },
          { 'href': vm.constants.FORUMS_APP_URL, 'text': 'FORUMS', 'icon': '/images/nav/forum.svg' },
          { 'sref': 'community.statistics', 'text': 'STATISTICS', 'icon': '/images/nav/statistics.svg' },
          { 'href': '/community/events/', 'text': 'EVENTS', 'icon': '/images/nav/calendar.svg' },
          { 'href': '/blog/', 'text': 'BLOG', 'icon': '/images/nav/blog.svg' }
      ]
    };

    function checkSubmit(ev) {
      if (ev.keyCode === 13)
        window.location.replace(vm.constants.MAIN_URL + '/search?s=' + vm.searchTerm + '&scope=member');
    }

    activate();

    function activate() {
      initHeaderProps('default');

      // List of events that might force header update
      angular.forEach([
        CONSTANTS.EVENT_USER_LOGGED_IN,
        CONSTANTS.EVENT_USER_LOGGED_OUT,
      ], function(event) {
        $rootScope.$on(event, function() {
          initHeaderProps(event);
        });
      });
    }

    function initHeaderProps(event) {
      $log.debug(event + ' triggered header update.');
      vm.isAuth = TcAuthService.isAuthenticated();
      if (vm.isAuth) {
        vm.userHandle = UserService.getUserIdentity().handle;
        vm.userMenu = [
          { 'sref': 'dashboard', 'text': 'DASHBOARD', 'icon': '/images/nav/dashboard.svg' },
          { 'sref': 'profile.about', 'srefParams': { 'userHandle': vm.userHandle }, 'text': 'MY PROFILE', 'icon': '/images/nav/badge.svg' },
          { 'href':  vm.constants.COMMUNITY_URL + '/PactsMemberServlet?module=PaymentHistory&full_list=false', 'text': 'PAYMENTS', 'icon': '/images/nav/money-bag.svg' },
          { 'sref': 'settings.profile', 'text': 'SETTINGS', 'icon': '/images/nav/gear.svg' },
        ];

        ProfileService.getUserProfile(vm.userHandle)
        .then(function(data) {
          vm.profile = data;
        })
        .catch(function(err) {
          $log.error("Unable to get user data");
          // todo handle error
        });
      }
    }

    function logout() {
      TcAuthService.logout()
      .then(function() {
        $state.go('home');
      });
    };

    // Intro data
    vm.introOptions = IntroService.getIntroData($state.$current.name);
  }
})();
