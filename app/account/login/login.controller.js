import angular from 'angular'
import { getCurrentUser, loadUser } from '../../services/userv3.service.js'

(function() {
  'use strict'

  angular.module('tc.account').controller('LoginController', LoginController)

  LoginController.$inject = ['logger', '$state', '$stateParams', '$window', '$rootScope', 'Helpers', 'CONSTANTS']

  function LoginController(logger, $state, $stateParams, $window, $rootScope, Helpers, CONSTANTS) {
    var vm = this
    vm.$stateParams = $stateParams

    activate()

    function activate() {
      var currentUser = getCurrentUser()
      logger.debug('checking for logged in user...' + currentUser)
      if (!currentUser) {
        logger.debug('loading user...')
        var next = $stateParams.next ? $stateParams.next : 'dashboard'
        loadUser().then(function(token) {
          logger.debug('successful login with token ' + token)
          $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_IN)
          logger.debug('reidrecting to ' + next)
          Helpers.redirectPostLogin(next)
        }, function() {
          logger.debug('State requires authentication, and user is not logged in, redirecting')
          // setup redirect for post login
          var retUrl = $state.href(next, {}, {absolute: true})
          logger.debug('redirecting to accounts app for login...')
          $window.location = CONSTANTS.ACCOUNTS_APP_URL + '?retUrl=' + encodeURIComponent(retUrl)
        })
      }
    }
  }

})()
