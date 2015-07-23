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
      isAuthenticated: isAuthenticated,
      socialRegisterCallbackHandler: socialRegisterCallbackHandler
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
            .then(function(appiriojwt) {
              // giving angular sometime to set the cookies
              $timeout(function() {
                // Store local copy of user info in local storage
                UserService.setUserIdentity(appiriojwt);

                $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_IN);

                resolve();
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
          state: state,
          callbackURL: CONSTANTS.auth0Callback
        });
      } else {
        $log.error('Unsupported social login backend: ' + backend);
        return false;
      }
    }

    function logout() {
      return $q(function(resolve, reject) {
        UserService.setUserIdentity(null);
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

    function socialRegisterCallbackHandler(auth0, tokenHash) {
      return $q(function(resolve, reject) {
        auth0.getProfile(tokenHash, function(err, profile, id_token, access_token, state) {
          if (!err) {
            var socialProvider = profile.identities[0].connection;
            var firstName = "" , lastName = "", handle = "", email = "", socialProviderId='';
            if(socialProvider === 'google-oauth2') {
              firstName = profile.given_name;
              lastName = profile.family_name;
              handle = profile.nickname;
              email = profile.email;
              socialProviderId = 2;
            } else if (socialProvider === 'facebook') {
              firstName = profile.given_name;
              lastName = profile.family_name;
              handle = firstName + '.' + lastName;
              email = profile.email;
              socialProviderId = 1;
            } else if (socialProvider === 'twitter') {
              var splitName = profile.name.split(" ");
              firstName = splitName[0];
              if (splitName.length > 1) {
                lastName = splitName[1];
              }
              handle = profile.screen_name;
              socialProviderId = 3;
            } else if (socialProvider === 'github') {
              var splitName = profile.name.split(" ");
              firstName = splitName[0];
              if (splitName.length > 1) {
                lastName = splitName[1];
              }
              handle = profile.nickname;
              email = profile.email;
              socialProviderId = 4;
            }
            var socialUserId = profile.user_id.substring(profile.user_id.indexOf('|')+1);
            // validate social profile
            UserService.validateSocialProfile(socialUserId, socialProviderId).then(
              function (data) {
                // success
                var result = {
                  status: 'SUCCESS',
                  data: {
                    socialUserId: socialUserId,
                    username: handle,
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    socialProfile: profile,
                    socialProvider: socialProvider
                  }
                };
                resolve(result);
              }, function (resp) {
                $log.error('Socail handle exist');
                reject({status: "SOCIAL_PROFILE_ALREADY_EXISTS"});
              }
            );
          } else {
            $log.error(err);
            reject({status: "INVALID_HASH"});
          }
        });
      });
    }

    function isAuthenticated() {
      return !!AuthTokenService.getV3Token();
    }

  }
})();
