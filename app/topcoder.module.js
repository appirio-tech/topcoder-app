(function() {
  'use strict';

  var dependencies = [
    'tc.layout',
    'tc.account',
    'tc.peer-review',
    'ui.router',
    'ngCookies'
  ];

  angular
    .module('topcoder', dependencies)
    .run(appRun);

  appRun.$inject = ['$rootScope', '$state', 'auth', '$cookies'];

  function appRun($rootScope, $state, auth, $cookies) {
    // Attaching $state to the $rootScope allows us to access the
    // current state in index.html (see div with ui-view on the index page)
    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if(toState.authenticate && !auth.isAuthenticated()) {
        console.log('State requires authentication, and user is not logged in.');
      }
    });
  }

  angular.module('topcoder').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('HeaderInterceptor');
  }]);

})();
