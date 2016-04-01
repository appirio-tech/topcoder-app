import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tc.layout').controller('HeaderController', HeaderController)

  HeaderController.$inject = ['$state', 'TcAuthService', 'CONSTANTS', '$log', '$rootScope', 'UserService', 'ProfileService', 'NavService', 'TagsService']

  function HeaderController($state, TcAuthService, CONSTANTS, $log, $rootScope, UserService, ProfileService, NavService, TagsService) {
    var vm = this

    vm.constants = CONSTANTS
    vm.domain = CONSTANTS.domain
    vm.suggest = suggest
    vm.searchTerm = ''

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
      $log.debug(event + ' triggered header update.')
      vm.isAuth = TcAuthService.isAuthenticated()
      if (vm.isAuth) {
        vm.userHandle = UserService.getUserIdentity().handle

        ProfileService.getUserProfile(vm.userHandle)
        .then(function(data) {
          vm.profile = data
          vm.userHandleColor = ProfileService.getUserHandleColor(vm.profile)
        })
        .catch(function(err) {
          $log.error('Unable to get user data')
          // todo handle error
        })
      }
    }

    function suggest(searchTerm) {
      return TagsService.getSuggestions(searchTerm)
      
    }
  }
})()
