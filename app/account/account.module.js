(function() {
  'use strict';

  var dependencies = [
    'ui.router',
    'auth0'
  ];

  angular.module('tc.account', dependencies)
    .config(['authProvider', function(authProvider) {
      authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
        profilePromise.then(function(profile) {
          store.set('profile', profile);
          store.set('token', idToken);
        });
        $location.hash('');
        $location.path('/info');
      });
    }]);

})();
