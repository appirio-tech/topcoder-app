(function() {
  'use strict';

  var dependencies = ['angular-jwt', 'ui.router', 'restangular', 'ngCookies', 'angularSlideables'];

  angular.module('tc.myDashboard', dependencies).run([
    '$rootScope',
    '$state',
    'authtoken',
    'tcAuth',
    '$cookies',
    run
  ]);

  function run($rootScope, $state, authtoken, tcAuth, $cookies) {
    $rootScope.$state = $state;
    localStorage.setItem('tcjwt', $cookies.get('tcjwt'));
    $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
      if (newUrl.indexOf('userJWTToken') > -1) {
        return authtoken.storeQueryStringToken(newUrl);
      }
    });
    return $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !tcAuth.isAuthenticated()) {
        //return tcAuth.checkLogin();
      }
    });
  }
})();