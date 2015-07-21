(function() {
  'use strict';

  angular.module('tc.services').factory('AuthTokenService', AuthTokenService);

  AuthTokenService.$inject = ['CONSTANTS', '$window', '$cookies', 'store', '$http', '$log', 'jwtHelper'];

  function AuthTokenService(CONSTANTS, $window, $cookies, store, $http, $log, jwtHelper) {
    var v2TokenKey = 'tcjwt';
    var v3TokenKey = 'appiriojwt';

    var service = {
      setV2Token: setV2Token,
      setV3Token: setV3Token,
      getV2Token: getV2Token,
      getV3Token: getV3Token,
      removeTokens: removeTokens,
      refreshV3Token: refreshV3Token,
      exchangeToken: exchangeToken,
      getTokenFromAuth0Code: getTokenFromAuth0Code,
      decodeToken: decodeToken
    };
    return service;

    ///////////////

    function setV2Token(token) {
      $window.document.cookie = v2TokenKey + '=' + token + '; path=/; domain=.' + CONSTANTS.domain + '; expires=' + new Date(new Date().getTime() + 12096e5);
    }

    function setV3Token(token) {
      store.set(v3TokenKey, token);
    }

    function getV3Token() {
      return store.get(v3TokenKey);
    }

    function getV2Token() {
      return $cookies.get(v2TokenKey);
    }

    function removeTokens() {
      // remove tokens
      $window.document.cookie = v2TokenKey + '=; path=/; domain=.' + CONSTANTS.domain + '; expires=' + (new Date(0)).toUTCString();
      store.remove(v3TokenKey);
    }

    function decodeToken(token) {
      return jwtHelper.decodeToken(token);
    }

    function refreshV3Token(token) {
      // TODO
      var newToken = '';
      return newToken
    }

    function exchangeToken(refreshToken, idToken) {
      return $http.post(
          CONSTANTS.API_URL + '/authorizations', {
            param: {
              refreshToken: refreshToken,
              externalToken: idToken
            }
          },
          {
            withCredentials: true
          })
        .then(
          function(resp) {
            setV3Token(resp.data.result.content.token);
            return true;
          },
          function(err) {
            $log.error(err);
            removeTokens();
          }
        );
    }

    function getTokenFromAuth0Code(code) {
      var req = {
        method: 'POST',
        url: CONSTANTS.API_URL + '/authorizations',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Auth0Code ' + code
        },
        data: {}
      };
      return $http(req).then(
        function(resp) {
          $log.debug(resp);

        },
        function(err) {
          $log.error(err);
        }
      );
    }
  }

})();
