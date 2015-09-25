(function() {
  'use strict';

  angular.module('tc.layout').controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$window', '$state', '$stateParams', 'TcAuthService', 'CONSTANTS', '$log', '$rootScope', 'UserService', 'ProfileService'];

  function HeaderController($window, $state, $stateParams, TcAuthService, CONSTANTS, $log, $rootScope, UserService, ProfileService) {
    var vm = this;
    
    vm.constants = CONSTANTS;
    vm.domain = CONSTANTS.domain;
    vm.login = TcAuthService.login;
    vm.logout = logout;
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

        ProfileService.getUserProfile(vm.userHandle).then(function(data) {
          vm.profile = data;
        })
        .catch(function(resp) {
          $log.error("Unable to get user data");
          // todo handle error
        })
      }
    }
    // init props default
    initHeaderProps('default');

    function logout() {
      TcAuthService.logout().then(
        function() {
          // success
          $state.go('home');
        });
    };

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

})();
