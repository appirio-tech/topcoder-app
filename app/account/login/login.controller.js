import angular from 'angular'
import { getCurrentUser, loadUser } from '../../services/userv3.service.js'

(function() {
  'use strict'

  angular.module('tc.account').controller('LoginController', LoginController)

  LoginController.$inject = ['logger', '$state', '$stateParams', '$location', '$scope', 'TcAuthService', 'UserService', 'Helpers', 'CONSTANTS']

  function LoginController(logger, $state, $stateParams, $location, $scope, TcAuthService, UserService, Helpers, CONSTANTS) {
    var vm = this
    vm.$stateParams = $stateParams

    activate()

    function activate() {
      var currentUser = getCurrentUser()
      if (!currentUser) {
        loadUser().then(function(token) {
          logger.debug('successful login with token ' + JSON.stringify(token))
          $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_IN)
          return Helpers.redirectPostLogin($stateParams.next)
        }, function() {
          logger.debug('State requires authentication, and user is not logged in, redirecting')
          // setup redirect for post login
          event.preventDefault()
          var next = $state.href(toState.name, toParams, {absolute: true})
          var retUrl = next
          $window.location = CONSTANTS.ACCOUNTS_APP_URL + '?retUrl=' + encodeURIComponent(retUrl)
        })
      }
    }
  }

})()
