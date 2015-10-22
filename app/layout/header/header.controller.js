(function() {
  'use strict';

  angular.module('tc.layout').controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$state', 'TcAuthService', 'CONSTANTS', '$log', '$rootScope', 'UserService', 'ProfileService', 'NavService'];

  function HeaderController($state, TcAuthService, CONSTANTS, $log, $rootScope, UserService, ProfileService, NavService) {
    var vm = this;

    vm.constants = CONSTANTS;
    vm.domain = CONSTANTS.domain;
    vm.login = TcAuthService.login;
    vm.logout = logout;
    vm.checkSubmit = checkSubmit;
    vm.searchTerm = '';
    vm.selectedGroup = selectedGroup;

    vm.menuLinks = NavService.menuLinks;

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
          { 'href':  vm.constants.COMMUNITY_URL + '/PactsMemberServlet?module=PaymentHistory&full_list=false', 'text': 'PAYMENTS', 'icon': '/images/nav/money-bag.svg', 'target': '_blank' },
          { 'sref': 'settings.profile', 'text': 'SETTINGS', 'icon': '/images/nav/gear.svg' },
        ];

        ProfileService.getUserProfile(vm.userHandle)
        .then(function(data) {
          vm.profile = data;
          vm.userHandleColor = ProfileService.getUserHandleColor(vm.profile);
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
    }

    function selectedGroup() {
      return NavService.selectedTopLevelItem.parent;
    }
  }
})();
