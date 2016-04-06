import angular from 'angular'

(function() {
  'use strict'

  var dependencies = [
    'tc.services',
    'tc.layout',
    'tc.account',
    'tc.peer-review',
    'tc.myDashboard',
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

  appRun.$inject = ['$rootScope', '$state', 'TcAuthService', '$cookies', 'Helpers', '$log']

  function appRun($rootScope, $state, TcAuthService, $cookies, Helpers, $log) {
    // Attaching $state to the $rootScope allows us to access the
    // current state in index.html (see the body tag)
    $rootScope.$state = $state

    // check AuthNAuth on change state start
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.data.authRequired && !TcAuthService.isAuthenticated()) {
        $log.debug('State requires authentication, and user is not logged in, redirecting')
        // setup redirect for post login
        event.preventDefault()
        var next = $state.href(toState.name, toParams, {absolute: false})
        $state.go('login', {next: next})
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
})()
