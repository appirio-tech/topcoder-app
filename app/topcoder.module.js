(function() {
  'use strict';

  var dependencies = [
    'tc.services',
    'tc.layout',
    'tc.account',
    'tc.peer-review',
    'tc.myDashboard',
    'tc.mySRMs',
    'tc.myChallenges',
    'tc.sample',
    'tc.profile',
    'tc.settings',
    'tc.skill-picker',
    'ui.router',
    'blocks.logger',
    'blocks.exception',
    'ngCookies',
    'angular-storage',
    'restangular',
    'ngNotificationsBar',
    'ngSanitize',
    'ngDropdowns',
    'ngDialog',
    'xml',
    'angular.filter',
    'CONSTANTS',
    'dcbImgFallback',
    'toaster',
    'angular-intro',
    'ngMessages',
    'angular-carousel',
    'sticky'
  ];

  angular.module('topcoder', dependencies).run(appRun);

  appRun.$inject = ['$rootScope', '$state', 'TcAuthService', '$cookies', 'Helpers', '$log', 'NotificationService', 'CONSTANTS'];

  function appRun($rootScope, $state, TcAuthService, $cookies, Helpers, $log, NotificationService, CONSTANTS) {
    // Attaching $state to the $rootScope allows us to access the
    // current state in index.html (see the body tag)
    $rootScope.$state = $state;

    // check AuthNAuth on change state start
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.data.authRequired && !TcAuthService.isAuthenticated()) {
        $log.debug('State requires authentication, and user is not logged in, redirecting');
        // setup redirect for post login
        event.preventDefault();
        var next = $state.href(toState.name, toParams, {absolute: false});
        $state.go('login', {next: next});
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      // set document title
      document.title = Helpers.getPageTitle(toState, $state.$current);
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      console.log.bind(console);
    });

    // NotificationService.getNotifications();
  }

  angular.module('topcoder').config(['$httpProvider', 'RestangularProvider', '$locationProvider',
   function($httpProvider, RestangularProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('HeaderInterceptor');
    RestangularProvider.setRequestSuffix('/');
  }]);

})();
