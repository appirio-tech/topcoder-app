import angular from 'angular'
import { getCurrentUser, logout as doLogout } from './userv3.service.js'

(function() {
  'use strict'

  angular.module('tc.services').factory('TcAuthService', TcAuthService)

  TcAuthService.$inject = ['CONSTANTS', 'auth', '$rootScope', '$q', 'logger', '$timeout', 'UserService', 'Helpers', 'ApiService', 'store', '$http']

  function TcAuthService(CONSTANTS, auth, $rootScope, $q, logger, $timeout, UserService, Helpers, ApiService, store, $http) {
    var auth0 = auth
    var service = {
      socialRegistration: socialRegistration,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated
    }
    return service

    function socialRegistration(provider, state) {
      return $q(function(resolve, reject) {
        // supported backends
        var providers = ['facebook', 'google-oauth2', 'twitter', 'github']
        if (providers.indexOf(provider) > -1) {
          auth0.signin({
            popup: true,
            connection: provider,
            scope: 'openid profile offline_access',
            state: state
          },
            function(profile, idToken, accessToken, state, refreshToken) {
              var socialData = Helpers.getSocialUserData(profile, accessToken)

              UserService.validateSocialProfile(socialData.socialUserId, socialData.socialProvider)
                .then(function(resp) {
                  logger.debug(JSON.stringify(resp))
                  if (resp.valid) {
                    // success
                    var result = {
                      status: 'SUCCESS',
                      data: socialData
                    }
                    logger.debug('socialRegister Result: ' + JSON.stringify(result))
                    resolve(result)
                  } else {
                    if (resp.reasonCode === 'ALREADY_IN_USE') {
                      logger.error('Social handle exist')
                      reject({
                        status: 'SOCIAL_PROFILE_ALREADY_EXISTS'
                      })
                    }
                  }

                })
                .catch(function(err) {
                  logger.debug(JSON.stringify(err))
                })
            },
            function(error) {
              logger.warning('onSocialLoginFailure ' + JSON.stringify(error))
              reject(error)
            }
          )
        } else {
          logger.error('Unsupported social login provider', provider)

          reject({
            status: 'FAILED',
            'error': 'Unsupported social login provider \'' + provider + '\''
          })
        }
      })
    }

    function logout() {
      // logout of all browsers
      return doLogout().then(function() {
        $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_OUT)
      })
    }

    function register(userInfo) {
      // api params
      // required: ["firstName", "lastName", "handle", "country", "email"],
      // optional: ["password", "socialProviderId", "socialUserName", "socialEmail", "socialEmailVerified", "regSource", "socialUserId", "utm_source", "utm_medium", "utm_campaign"]
      return UserService.createUser(userInfo)
    }

    function isAuthenticated() {
      return !!getCurrentUser() && !!AuthTokenService.getV2Token() && !!AuthTokenService.getTCSSOToken()

    }

  }
})()
