import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tc.layout').controller('HeaderController', HeaderController)

  HeaderController.$inject = ['$state', 'TcAuthService', 'CONSTANTS', 'logger', '$rootScope', 'UserService', 'ProfileService', 'NavService']

  function HeaderController($state, TcAuthService, CONSTANTS, logger, $rootScope, UserService, ProfileService, NavService) {
    var vm = this

    vm.constants = CONSTANTS
    vm.domain = CONSTANTS.domain
    vm.login = TcAuthService.login
    vm.checkSubmit = checkSubmit
    vm.searchTerm = ''
    vm.selectedGroup = selectedGroup

    vm.menuLinks = NavService.menuLinks

    function checkSubmit(ev) {
      if (ev.keyCode === 13) {
        // window.location.replace(vm.constants.MAIN_URL + '/search?s=' + vm.searchTerm + '&scope=member')

        // Replace with new member search url
        window.location.replace('/search/members/?q=' + window.encodeURIComponent(vm.searchTerm))
      }
    }

    activate()

    function activate() {
      initHeaderProps('default')

      // List of events that might force header update
      angular.forEach([
        CONSTANTS.EVENT_USER_LOGGED_IN,
        CONSTANTS.EVENT_USER_LOGGED_OUT,
        CONSTANTS.EVENT_PROFILE_UPDATED
      ], function(event) {
        $rootScope.$on(event, function() {
          initHeaderProps(event)
        })
      })
    }

    function initHeaderProps(event) {
      logger.debug(event + ' triggered header update.')

      vm.isAuth = TcAuthService.isAuthenticated()

      if (vm.isAuth) {
        vm.userHandle = UserService.getUserIdentity().handle

        vm.userMenu = [
          { 'sref': 'dashboard', 'text': 'DASHBOARD', 'icon': require('../../../assets/images/nav/dashboard.svg') },
          { 'sref': 'profile.about', 'srefParams': { 'userHandle': vm.userHandle }, 'text': 'MY PROFILE', 'icon': require('../../../assets/images/nav/profile.svg') },
          { 'href':  vm.constants.COMMUNITY_URL + '/PactsMemberServlet?module=PaymentHistory&full_list=false', 'text': 'PAYMENTS', 'icon': require('../../../assets/images/nav/wallet.svg') },
          { 'sref': 'settings.profile', 'text': 'SETTINGS', 'icon': require('../../../assets/images/nav/settings.svg') }
        ]

        ProfileService.getUserProfile(vm.userHandle)
        .then(function(data) {
          vm.profile = data
          vm.userHandleColor = ProfileService.getUserHandleColor(vm.profile)
        })
        .catch(function(err) {
          logger.error('Unable to get user profile data', err)
        })
      }
    }

    function selectedGroup() {
      return _.get(NavService, 'selectedTopLevelItem', null)
    }
  }
})()
