(function() {
  'use strict';

  angular.module('tc.services').factory('ExternalAccountService', ExternalAccountService);

  ExternalAccountService.$inject = ['$q', '$log', 'CONSTANTS', 'auth', 'ApiService', 'UserService', 'Helpers'];

  function ExternalAccountService($q, $log, CONSTANTS, auth, ApiService, UserService, Helpers) {
    var auth0 = auth;
    $log = $log.getInstance('ExternalAccountService');

    var api = ApiService.restangularV3;

    var service = {
      getLinkedExternalAccounts: getLinkedExternalAccounts,
      linkExternalAccount: linkExternalAccount,
      unlinkExternalAccount: unlinkExternalAccount
    };
    return service;

    //////////////////////

    /**
     * @brief Retrieves a list of linked external accounts for the user.
     *
     * @param  userId
     * @return list of linked Accounts
     */
    function getLinkedExternalAccounts(userId) {
      return api.one('users', userId).get({fields:"profiles"})
      .then(function(result) {
        return result.profiles || [];
      });
    }

    function unlinkExternalAccount(account) {
      throw new Error("not implemented");
    }

    function linkExternalAccount(provider, callbackUrl) {
      return $q(function(resolve, reject) {
        // supported backends
        var backends = ['facebook', 'google-oauth2', 'bitbucket', 'github'];
        if (backends.indexOf(provider) > -1) {
          auth0.signin({
              popup: true,
              connection: provider,
              scope: "openid profile offline_access",
              state: callbackUrl,
              // callbackURL: CONSTANTS.auth0Callback
            },
            function(profile, idToken, accessToken, state, refreshToken) {
              $log.debug("onSocialLoginSuccess");
              var socialData = Helpers.getSocialUserData(profile, accessToken);
              var user = UserService.getUserIdentity();
              var postData = {
                userId: socialData.socialUserId,
                name: socialData.username,
                email: socialData.email,
                emailVerified: false,
                providerType: socialData.socialProvider,
                context: {
                  handle: user.handle,
                  accessToken: socialData.accessToken
                }
              };
              $log.debug("link API postdata: " + JSON.stringify(postData));
              var api = ApiService.restangularV3;
              api.one('users', user.userId).customPOST(postData, "profiles", {}, {})
                .then(function(resp) {
                  $log.debug("Succesfully linked account: " + JSON.stringify(resp));
                  resolve({
                    status: "SUCCESS",
                    profile: postData
                  });
                })
                .catch(function(resp) {
                  $log.error("Error linking account: " + resp.data.result.content);
                  reject({
                    status: "SOCIAL_PROFILE_ALREADY_EXISTS",
                    msg: resp.data.result.content
                  });
                });
            },
            function(error) {
              $log.warn("onSocialLoginFailure " + JSON.stringify(error));
              reject(error);
            }
          );
        } else {
          $log.error('Unsupported social login backend: ' + backend);
          $q.reject({
            status: "failed",
            "error": "Unsupported social login backend '" + backend + "'"
          });
        }
      });
    };
  }
})();
