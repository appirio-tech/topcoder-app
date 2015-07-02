(function() {
  'use strict';

  var dependencies = [
    'tc.layout',
    'tc.account',
    'tc.peer-review',
    'tc.sample',
    'ui.router',
    'blocks.logger', 'blocks.exception',
    'ngCookies',
    'angular-storage',
    'restangular'
  ];

  angular
    .module('topcoder', dependencies)
    .run(appRun);

  appRun.$inject = ['$rootScope', '$state', 'auth', '$cookies', 'helpers', '$log'];

  function appRun($rootScope, $state, auth, $cookies, helpers, $log) {
    // Attaching $state to the $rootScope allows us to access the
    // current state in index.html (see div with ui-view on the index page)
    $rootScope.$state = $state;

    // check AuthNAuth on change state start
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.data.authRequired && !auth.isAuthenticated()) {
        $log.debug('State requires authentication, and user is not logged in, redirecting');
        // setup redirect for post login
        event.preventDefault();
        var next = $state.href(toState.name, toParams, {absolute: false});
        $state.go('login', {next: next});
      }

    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      // set document title
      document.title = helpers.getPageTitle(toState, $state.$current);
    });
  }

  angular.module('topcoder').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('HeaderInterceptor');
  }]);

})();
