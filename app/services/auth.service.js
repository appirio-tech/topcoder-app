(function() {
  'use strict';

  angular.module('topcoder').factory('tcAuth', tcAuth);

  tcAuth.$inject = ['CONSTANTS', '$window', 'authtoken', '$state', '$stateParams', 'api', '$rootScope', '$q', '$log', '$http'];

  function tcAuth(CONSTANTS, $window, authtoken, $state, $stateParams, api, $rootScope, $q, $log, $http) {
    var auth0 = new Auth0({
      domain: CONSTANTS.auth0Domain,
      clientID: CONSTANTS.clientId,
      // callbackOnLocationHash: true,
      callbackURL: CONSTANTS.auth0Callback
    });

    var service = {
      login: login,
      socialLogin: socialLogin,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated
    };
    return service;

    ///////////////

    function login(username, password) {
      var options = {
        connection: 'LDAP',
        scope: 'openid profile offline_access',
        device: "webapp",
        username: username,
        password: password
      };
      return $q(function(resolve, reject) {
        auth0.signin(
          options,
          function(err, profile, idToken, accessToken, state, refreshToken) {
            if (err) {
              $log.error(err);
              reject(err);
            } else {
              // set token
              // authtoken.setV2Token(idToken);
              // exchange token
              authtoken.exchangeToken(refreshToken, idToken)
                .then(function() {
                  $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_IN);
                });
              resolve();
          }
        });
      });
    }

    function socialLogin(backend, state) {
      // supported backends
      var backends = ['facebook', 'google-oauth2', 'twitter', 'github'];
      if (backends.indexOf(backend) > -1) {
        auth0.login({
          connection: backend,
          device: 'webapp',
          scope: "openid profile offline_access",
          state: state
        });
      } else {
        $log.error('Unsupported social login backend: ' + backend);
        return false;
      }
    }

    function logout(successCallback) {
      return $q(function(resolve, reject) {
        authtoken.removeTokens();
        $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_OUT);
        resolve();
      });
    }

    function register(reg) {
      // api params
      // required: ["firstName", "lastName", "handle", "country", "email"],
      // optional: ["password", "socialProviderId", "socialUserName", "socialEmail", "socialEmailVerified", "regSource", "socialUserId", "utm_source", "utm_medium", "utm_campaign"]
      var url = CONSTANTS.API_URL_V2 + '/users/';
      api.requestHandler('POST', url, JSON.stringify(reg));
    }

    function isAuthenticated() {
      return !!authtoken.getV2Token();
    }

  }
})();
