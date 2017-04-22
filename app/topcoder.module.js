import angular from 'angular'
import { getCurrentUser, loadUser } from './services/userv3.service.js'

(function() {
  'use strict'

  var dependencies = [
    'tc.services',
    'tc.layout',
    'tc.account',
    'tc.peer-review',
    'tc.myDashboard',
    'tc.listings',
    'tc.fontTest',
    'tc.mySRMs',
    'tc.myChallenges',
    'tc.profile',
    'tc.settings',
    'tc.submissions',
    'tc.skill-picker',
    'tc.sitemap',
    'tc.community',
    'tc.search',
    'ui.router',
    'blocks.logger',
    'blocks.exception',
    'ngCookies',
    'angular-storage',
    'restangular',
    'ngSanitize',
    'ngDialog',
    'angular.filter',
    'CONSTANTS',
    'dcbImgFallback',
    'toaster',
    'angular-intro',
    'ngMessages',
    'angular-carousel',
    'dibari.angular-ellipsis'
  ]

  angular.module('topcoder', dependencies).run(appRun)

  appRun.$inject = ['$rootScope', '$state', '$urlRouter', 'TcAuthService', 'CONSTANTS', '$window', '$cookies', 'Helpers', 'logger']

  function appRun($rootScope, $state, $urlRouter, TcAuthService, CONSTANTS, $window, $cookies, Helpers, logger) {
    // Attaching $state to the $rootScope allows us to access the
    // current state in index.html (see the body tag)
    $rootScope.$state = $state

    // check AuthNAuth on change state start
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      logger.debug('checking auth for state: ' + toState.name + ' from state: ' + fromState.name)
      if (!toState.data || !toState.data.authRequired) {
        return true
      }
      var currentUser = getCurrentUser()
      if (!currentUser) {
        event.preventDefault()
        loadUser().then(function(token) {
          logger.debug('successful login with token ' + JSON.stringify(token))
          $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_IN)
          logger.debug('Going to state: ' + toState.name)
          $state.go(toState.name, toParams, {notify: false})
          $urlRouter.sync()
        }, function() {
          if (toState.data && toState.data.authRequired) {
            logger.debug('State requires authentication, and user is not logged in, redirecting')
            // setup redirect for post login
            event.preventDefault()
            var next = $state.href(toState.name, toParams, {absolute: true})
            var retUrl = next
            $window.location = CONSTANTS.ACCOUNTS_APP_URL + '?retUrl=' + encodeURIComponent(retUrl)
          } else { // should never land in this block
            logger.debug('Going to state: ' + toState.name)
            $state.go(toState.name, toParams, {notify: false})
            $urlRouter.sync()
          }
        })
        return false
      }
    })

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      // set document title
      document.title = Helpers.getPageTitle(toState, $state.$current)
      // adds previous state to scope
      $rootScope.previousState = fromState
    })

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      /*eslint no-console:0 */
      console.log.bind(console)
    })
  }

  angular.module('topcoder').config(['RestangularProvider', '$locationProvider',
    function(RestangularProvider, $locationProvider) {
      $locationProvider.html5Mode(true)
      RestangularProvider.setRequestSuffix('/')
    }])

  // related issue and possible workaround: https://github.com/angular-ui/ui-router/issues/2889
  angular.module('topcoder').config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false)
  }])
})()
