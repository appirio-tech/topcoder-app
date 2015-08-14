(function() {
  'use strict';

  var dependencies = [
    'ui.router',
    'tc.services',
  ];

  angular.module('tc.account', dependencies);
    // .config(['authProvider', function(authProvider) {
    //   // FIXME read from config
    //   authProvider.init({
    //     domain: 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT',
    //     clientID: 'topcoder-dev.com',
    //     callbackURL: 'https://api.topcoder-dev.com/pub/callback.html'
    //   });
    // }])
    // .run(['auth', function(auth) {
    //   auth.hookEvents();
    // }]);
})();
