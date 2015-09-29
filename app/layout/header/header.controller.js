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
          { 'href':  "/challenges/design/active/", 'text': 'DESIGN CHALLENGES' },
          { 'href':  "/challenges/develop/active", 'text': 'DEVELOPMENT CHALLENGES' },
          { 'href':  "/challenges/data/active", 'text': 'DATA SCIENCE CHALLENGES' },
          { 'href':  vm.constants.ARENA_URL, 'text': 'THE ARENA' },
      ],
      'learn': [
          { 'href': '/community/design/', 'text': 'DESIGN' },
          { 'href': '/community/development/', 'text': 'DEVELOPMENT' },
          { 'href': '/community/data-science/', 'text': 'DATA SCIENCE' },
          { 'href': '/community/data-science/', 'text': 'COMPETITIVE PROGRAMMING' },
      ],
      'community': [
          { 'href': '/community/members/', 'text': 'MEMBERS' },
          { 'href': '/community/member-programs/', 'text': 'PROGRAMS' },
          { 'href': vm.constants.FORUMS_APP_URL, 'text': 'FORUMS' },
          { 'href': '/community/statistics/', 'text': 'STATISTICS' },
          { 'href': '/community/events/', 'text': 'EVENTS' },
          { 'href': '/blog/', 'text': 'BLOG' }
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
          { 'sref': 'dashboard', 'text': 'DASHBOARD' },
          { 'sref': 'profile.about', 'srefParams': { 'userHandle': vm.userHandle }, 'text': 'MY PROFILE' },
          { 'href':  vm.constants.COMMUNITY_URL + '/PactsMemberServlet?module=PaymentHistory&full_list=false', 'text': 'PAYMENTS' },
          { 'sref': 'settings.profile', 'text': 'SETTINGS' },
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
