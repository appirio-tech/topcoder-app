(function() {
  'use strict';

  var dependencies = [
    'tc.services',
    'tc.layout',
    'tc.account',
    'tc.peer-review',
    'tc.myDashboard',
    'tc.sample',
    'tc.profile',
    'ui.router',
    'blocks.logger',
    'blocks.exception',
    'ngCookies',
    'angular-storage',
    'restangular',
    'ngNotificationsBar',
    'ngSanitize',
    'ngDropdowns',
    'xml',
    'angular.filter',
    'CONSTANTS'
  ];

  angular
    .module('topcoder', dependencies)
    .run(appRun);

  appRun.$inject = ['$rootScope', '$state', 'TcAuthService', '$cookies', 'Helpers', '$log', 'NotificationService', '$window', 'CONSTANTS'];

  function appRun($rootScope, $state, TcAuthService, $cookies, Helpers, $log, NotificationService, $window, CONSTANTS) {
    // Attaching $state to the $rootScope allows us to access the
    // current state in index.html (see div with ui-view on the index page)
    $rootScope.$state = $state;

    $window.NEW_RELIC_APPLICATION_ID = CONSTANTS.NEW_RELIC_APPLICATION_ID;

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

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, eventrror) {
      console.log.bind(console);
    });

    // NotificationService.getNotifications();
  }

  angular.module('topcoder').config(['$httpProvider', 'RestangularProvider', function($httpProvider, RestangularProvider) {
    $httpProvider.interceptors.push('HeaderInterceptor');
    RestangularProvider.setRequestSuffix('/');
  }]);

})();
