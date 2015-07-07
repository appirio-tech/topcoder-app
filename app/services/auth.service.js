(function() {
  'use strict';

  angular.module('topcoder').factory('auth', auth);

  auth.$inject = ['CONSTANTS', '$window', 'authtoken', '$state', '$stateParams', 'api', '$rootScope', '$q', '$log', '$http'];

  function auth(CONSTANTS, $window, authtoken, $state, $stateParams, api, $rootScope, $q, $log, $http) {
    var auth0 = new Auth0({
      domain: CONSTANTS.auth0Domain,
      clientID: CONSTANTS.clientId,
      callbackURL: CONSTANTS.auth0Callback
    });

    var service = {
      login: login,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated,
      initiateResetPassword: initiateResetPassword
    };
    return service;

    ///////////////

    function login(username, password) {
      var options = {
        connection: 'LDAP',
        scope: 'openid profile',
        username: username,
        password: password
      };
      return $q(function(resolve, reject) {
        auth0.signin(options, function(err, profile, v2_id_token, access_token, state) {
          if (err) {
            $log.error(err);
            reject(err);
          } else {
            authtoken.setV2Token(v2_id_token);
            // retrieve V3 Token
            var req = {
              method: 'GET',
              url: CONSTANTS.API_URL + '/authorizations/1',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + v2_id_token,
              }
            };
            $http(req)
              .success(function(resp) {
                if (resp.result.success) {
                  authtoken.setV3Token(resp.result.content.token);
                  $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_IN);
                } else {
                  $log.error("Failed to exchange token");
                }
              })
              .error(function(err) {
                // TODO handle error
                $log.error(err);
                reject(err);
              });
            resolve();
          }
        })
      });
    }

    function logout(successCallback) {
      return $q(function(resolve, reject) {
        authtoken.removeTokens();
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

    function initiateResetPassword(email) {
      return $q(function(resolve, reject) {
        resolve(true);
      });
    }

  }
})();
