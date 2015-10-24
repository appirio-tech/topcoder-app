(function() {
  'use strict';

  angular.module('tc.services').factory('ExternalAccountService', ExternalAccountService);

  ExternalAccountService.$inject = ['$q', '$log', 'CONSTANTS', 'auth', 'ApiService', 'UserService', 'Helpers'];

  function ExternalAccountService($q, $log, CONSTANTS, auth, ApiService, UserService, Helpers) {
    var auth0 = auth;
    $log = $log.getInstance('ExternalAccountService');

    var api = ApiService.restangularV3;
    var userApi = ApiService.getApiServiceProvider('USER');

    var service = {
      getLinkedExternalAccounts: getLinkedExternalAccounts,
      getLinkedExternalLinksData: getLinkedExternalLinksData,
      linkExternalAccount: linkExternalAccount,
      unlinkExternalAccount: unlinkExternalAccount,
      addWebLink : addWebLink
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
      return userApi.one('users', userId).get({fields:"profiles"})
      .then(function(result) {
        return result.profiles || [];
      });
    }

    function getLinkedExternalLinksData(userHandle) {
      return api.one('members', userHandle).withHttpConfig({skipAuthorization: true}).customGET('externalAccounts')
      .then(function(data) {
        // TODO workaround for dribbble spelling mistake, remove once API is fixed
        if (data.dribble) {
          data.dribbble = data.dribble;
        }
        return data;
      })
    }

    function unlinkExternalAccount(account) {
      var user = UserService.getUserIdentity();
      return $q(function($resolve, $reject) {
        UserService.removeSocialProfile(user.userId, account)
        .then(function(resp) {
          $log.debug("Succesfully unlinked account: " + JSON.stringify(resp));
          $resolve({
            status: "SUCCESS"
          });
        })
        .catch(function(resp) {
          $log.error("Error unlinking account: " + resp.data.result.content);
          var status = resp.status;
          var msg = resp.data.result.content;
          if (resp.status = 404) {
            status = "SOCIAL_PROFILE_NOT_EXIST";
          } else {
            status = "FATAL_ERROR"
          }
          $reject({
            status: status,
            msg: msg
          });
        });
      });
    }

    function addWebLink(userId, userHandle, url) {
      var provider = "url::" + url;
      var postData = {
        userId: userId,
        providerType: provider,
        context: {
          handle: userHandle
        }
      };
      // delegates to user service
      return UserService.addSocialProfile(userId, postData);
    }

    function linkExternalAccount(provider, callbackUrl) {
      return $q(function(resolve, reject) {
        // supported backends
        var backends = ['facebook', 'google-oauth2', 'bitbucket', 'github', 'linkedin', 'stackoverflow', 'dribbble'];
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
                name: socialData.username,// TODO it should be first+last Name
                email: socialData.email,
                emailVerified: false,
                providerType: socialData.socialProvider,
                context: {
                  handle: socialData.username,
                  accessToken: socialData.accessToken
                }
              };
              if (socialData.accessTokenSecret) {
                postData.context.accessTokenSecret = socialData.accessTokenSecret;
              }
              $log.debug("link API postdata: " + JSON.stringify(postData));
              userApi.one('users', user.userId).customPOST(postData, "profiles", {}, {})
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
          $log.error('Unsupported social login backend: ' + provider);
          $q.reject({
            status: "failed",
            "error": "Unsupported social login backend '" + provider + "'"
          });
        }
      });
    };
  }
})();
