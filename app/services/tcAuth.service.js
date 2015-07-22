(function() {
  'use strict';

  angular.module('tc.services').factory('TcAuthService', TcAuthService);

  TcAuthService.$inject = ['CONSTANTS', 'AuthTokenService', '$rootScope', '$q', '$log', '$timeout', 'UserService'];

  function TcAuthService(CONSTANTS, AuthTokenService, $rootScope, $q, $log, $timeout, UserService) {
    var auth0 = new Auth0({
      domain: CONSTANTS.auth0Domain,
      clientID: CONSTANTS.clientId,
      // callbackOnLocationHash: true,
      callbackURL: CONSTANTS.auth0Callback
      // callbackURL: 'http://local.topcoder-dev.com:3000/login'
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
        auth0.signin(options, function(err, profile, idToken, accessToken, state, refreshToken) {
          if (err) {
            $log.error(err);
            reject(err);
          } else {
            // exchange token
            AuthTokenService.exchangeToken(refreshToken, idToken)
            .then(function() {
              // giving angular sometime to set the cookies
              $timeout(function() {
                // Store local copy of user info in UserService
                var idString = profile.user_id;
                var index    = idString.lastIndexOf('|');
                var id       = idString.slice(index + 1);

                UserService.getUser(id)
                .then(function(res) {
                  var user = res.result.content;

                  var userInfo = {
                    username : user.handle,
                    id       : user.id,
                    email    : user.email,
                    firstName: user.firstName,
                    lastName : user.lastName
                  };

                  UserService.setUserInfo(userInfo);

                  $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_IN);
                  resolve();
                })
                .catch(function(err) {
                  // Should we log the user out if this gives an error?
                  $log.debug(err);
                });
              }, 200);
            });
          }
        });
      });
    }

    function socialLogin(backend, state) {
      // supported backends
      var backends = ['facebook', 'google-oauth2', 'twitter', 'github'];

      if (backends.indexOf(backend) > -1) {
        auth0.signin({
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
      UserService.setUserInfo(null);

      return $q(function(resolve, reject) {
        AuthTokenService.removeTokens();
        $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_OUT);
        resolve();
      });
    }

    function register(userInfo) {
      // api params
      // required: ["firstName", "lastName", "handle", "country", "email"],
      // optional: ["password", "socialProviderId", "socialUserName", "socialEmail", "socialEmailVerified", "regSource", "socialUserId", "utm_source", "utm_medium", "utm_campaign"]
      return UserService.createUser(userInfo);
    }

    function isAuthenticated() {
      return !!AuthTokenService.getV2Token();
    }

  }
})();
