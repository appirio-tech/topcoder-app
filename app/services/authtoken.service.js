(function() {
  'use strict';

  angular.module('tc.services').factory('AuthTokenService', AuthTokenService);

  AuthTokenService.$inject = ['CONSTANTS', '$cookies', '$location', 'store', '$http', '$log', 'jwtHelper'];

  function AuthTokenService(CONSTANTS, $cookies, $location,  store, $http, $log, jwtHelper) {
    var v2TokenKey = 'tcjwt';
    var v3TokenKey = 'appiriojwt';

    var service = {
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
      // need to provide domain when removing cookie
      var domain = $location.host().substring($location.host().indexOf("."));
      $cookies.remove(v2TokenKey, {domain: domain});
      $cookies.remove('tcsso', {domain: domain});
      store.remove(v3TokenKey);
    }

    function decodeToken(token) {
      return jwtHelper.decodeToken(token);
    }

    function refreshV3Token(token) {
      // This is a promise of a JWT id_token
      return $http({
        url: CONSTANTS.API_URL + '/authorizations/1',
        method: 'GET',
        headers: {
          'Authorization': "Bearer " + token
        },
        data: {}
      }).then(function(response) {
        var appiriojwt = res.data.result.content.token;
        setV3Token(appiriojwt);
        return appiriojwt;
      }).catch(function(resp) {
        $log.error(resp);
        removeTokens();
      });
    }

    function exchangeToken(refreshToken, idToken) {
      var req = {
        method: "POST",
        url: CONSTANTS.API_URL + '/authorizations',
        data: {
          param: {
            refreshToken: refreshToken,
            externalToken: idToken
          }
        },
        skipAuthorization: true,
        withCredentials: true,
        headers: {}
      };
      return $http(req).then(
        function(res) {
          var appiriojwt = res.data.result.content.token;
          setV3Token(appiriojwt);
          return appiriojwt;
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
        skipAuthorization: true,
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
