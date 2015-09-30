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
          { 'href':  "/challenges/design/active/", 'text': 'DESIGN CHALLENGES', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/design.svg' },
          { 'href':  "/challenges/develop/active", 'text': 'DEVELOPMENT CHALLENGES', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/development.svg' },
          { 'href':  "/challenges/data/active", 'text': 'DATA SCIENCE CHALLENGES', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/data-science.svg' },
          { 'href':  vm.constants.ARENA_URL, 'text': 'THE ARENA', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/srms.svg' },
      ],
      'learn': [
          { 'href': '/community/design/', 'text': 'DESIGN', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/scroll-design.svg' },
          { 'href': '/community/development/', 'text': 'DEVELOPMENT', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/scroll-develop.svg' },
          { 'href': '/community/data-science/', 'text': 'DATA SCIENCE', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/scroll-data.svg' },
          { 'href': '/community/data-science/', 'text': 'COMPETITIVE PROGRAMMING', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/srms.svg' },
      ],
      'community': [
          { 'href': '/community/members/', 'text': 'MEMBERS', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/users.svg' },
          { 'href': '/community/member-programs/', 'text': 'PROGRAMS', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/medal.svg' },
          { 'href': vm.constants.FORUMS_APP_URL, 'text': 'FORUMS', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/forum.svg' },
          { 'href': '/community/statistics/', 'text': 'STATISTICS', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/statistics.svg' },
          { 'href': '/community/events/', 'text': 'EVENTS', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/calendar.svg' },
          { 'href': '/blog/', 'text': 'BLOG', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/blog.svg' }
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
          { 'sref': 'dashboard', 'text': 'DASHBOARD', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/dashboard.svg' },
          { 'sref': 'profile.about', 'srefParams': { 'userHandle': vm.userHandle }, 'text': 'MY PROFILE', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/badge.svg' },
          { 'href':  vm.constants.COMMUNITY_URL + '/PactsMemberServlet?module=PaymentHistory&full_list=false', 'text': 'PAYMENTS', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/money-bag.svg' },
          { 'sref': 'settings.profile', 'text': 'SETTINGS', 'icon': vm.constants.ASSET_PREFIX + '/images/nav/gear.svg' },
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
    console.log(vm.introOptions);
  }
})();
