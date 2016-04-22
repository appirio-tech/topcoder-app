import angular from 'angular'
import { getCurrentUser } from '../services/userv3.service.js'
import { isTokenExpired, getFreshToken } from 'tc-accounts'

(function() {
  'use strict'

  angular.module('tc.services').factory('JwtInterceptorService', JwtInterceptorService)

  JwtInterceptorService.$inject = ['logger', 'jwtHelper', 'AuthTokenService', 'TcAuthService', '$state', '$location', '$window', 'CONSTANTS']

  function JwtInterceptorService(logger, jwtHelper, AuthTokenService, TcAuthService, $state, $location, $window, CONSTANTS) {
    var service = {
      getToken: getToken
    }
    ////////////

    function _checkAndRefreshToken(config, token) {
      if (isTokenExpired(token)) {
        logger.debug(String.supplant('Token has expired, attempting to refreshToken() for "{url}"', config))

        return getFreshToken().then(function(refreshedToken) {
          logger.debug('Successfully refreshed V3 token.')
          return refreshedToken
        })
        .catch(function(err) {
          // Server will not or cannot refresh token
          logger.debug('Unable to refresh V3 token, redirecting to login')
          // logger.debug(resp)
          var retUrl = CONSTANTS.MAIN_URL + '/?next=' + config.url
          $window.location = CONSTANTS.ACCOUNTS_APP_URL + '?retUrl=' + encodeURIComponent(retUrl)

          return null
        })
      } else {
        return token
      }
    }

    function getToken(config) {
      // skip token for .html
      if (config.url.indexOf('.html') > -1)
        return null

      var haveItAddItEndpoints = [
        { method: 'GET', url: '\/v3[\\d\\.\\-A-Za-z]*\/challenges'},
        { method: 'GET', url: '\/v2\/challenges'},
        { method: 'GET', url: '\/v2\/user'},

        // matchs everything besides /v3/members/{handle}/financial
        { method: 'GET', url: '\/v3[\\d\\.\\-A-Za-z]*\/members\/\\w+\/(?!financial)\\w*'}
      ]

      for (var i = 0; i < haveItAddItEndpoints.length; i++) {
        var obj = haveItAddItEndpoints[i]
        var re = new RegExp(obj.url)
        if (config.method.toUpperCase() === obj.method && re.test(config.url)) {
          if (TcAuthService.isAuthenticated()) {
            var token = null
            if (config.url.indexOf('v2/') > -1 ||
                config.url.indexOf('memberCert') > -1 ||
                config.url.indexOf('badges') > -1) {
              token = AuthTokenService.getV2Token()
            } else {
              token = getCurrentUser() !== null ? getCurrentUser().token : null
            }
            token = _checkAndRefreshToken(config, token)
          }
          // else
          logger.debug(String.supplant('Skipping authToken for "{url}, UnAuthenticated user"', config))
          return null
        }
      }

      // for everything else assume that we need to send token
      var idToken = config.url.indexOf('v2/') > -1 ? AuthTokenService.getV2Token() : (getCurrentUser() !== null ? getCurrentUser().token : null)

      if (!TcAuthService.isAuthenticated() || idToken == null) {
        var retUrl = CONSTANTS.MAIN_URL + '/?next=' + config.url
        $window.location = CONSTANTS.ACCOUNTS_APP_URL + '?retUrl=' + encodeURIComponent(retUrl)
        return
      }

      // Note only v3tokens expire
      return _checkAndRefreshToken(config, idToken)
    }
    return service
  }
})()
