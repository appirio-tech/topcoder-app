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
          { 'href':  "/challenges/design/active/", 'text': 'DESIGN CHALLENGES', 'icon': 'design' },
          { 'href':  "/challenges/develop/active", 'text': 'DEVELOPMENT CHALLENGES', 'icon': 'development' },
          { 'href':  "/challenges/data/active", 'text': 'DATA SCIENCE CHALLENGES', 'icon': 'data-science' },
          { 'href':  vm.constants.ARENA_URL, 'text': 'THE ARENA', 'icon': 'srms' },
      ],
      'learn': [
          { 'href': '/community/design/', 'text': 'DESIGN', 'icon': 'scroll-design' },
          { 'href': '/community/development/', 'text': 'DEVELOPMENT', 'icon': 'scroll-develop' },
          { 'href': '/community/data-science/', 'text': 'DATA SCIENCE', 'icon': 'scroll-data' },
          { 'href': '/community/data-science/', 'text': 'COMPETITIVE PROGRAMMING', 'icon': 'srms' },
      ],
      'community': [
          { 'href': '/community/members/', 'text': 'MEMBERS', 'icon': 'users' },
          { 'href': '/community/member-programs/', 'text': 'PROGRAMS', 'icon': 'medal' },
          { 'href': vm.constants.FORUMS_APP_URL, 'text': 'FORUMS', 'icon': 'forum' },
          { 'href': '/community/statistics/', 'text': 'STATISTICS', 'icon': 'statistics' },
          { 'href': '/community/events/', 'text': 'EVENTS', 'icon': 'calendar' },
          { 'href': '/blog/', 'text': 'BLOG', 'icon': 'blog' }
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
          { 'sref': 'dashboard', 'text': 'DASHBOARD', 'icon': 'dashboard' },
          { 'sref': 'profile.about', 'srefParams': { 'userHandle': vm.userHandle }, 'text': 'MY PROFILE', 'icon': 'badge' },
          { 'href':  vm.constants.COMMUNITY_URL + '/PactsMemberServlet?module=PaymentHistory&full_list=false', 'text': 'PAYMENTS', 'icon': 'money-bag' },
          { 'sref': 'settings.profile', 'text': 'SETTINGS', 'icon': 'gear' },
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
