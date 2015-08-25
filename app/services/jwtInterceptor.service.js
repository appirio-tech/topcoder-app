(function() {
  'use strict';

  angular.module('tc.services').factory('JwtInterceptorService', JwtInterceptorService);

  JwtInterceptorService.$inject = ['jwtHelper', 'AuthTokenService', 'TcAuthService', '$state'];

  function JwtInterceptorService(jwtHelper, AuthTokenService, TcAuthService, $state) {
    var service = {
      getToken: getToken
    };
    ////////////

    function getToken(config) {
      // skip token for .html
      if (config.url.indexOf('.html') > -1)
        return null;

      var haveItAddItEndpoints = [
        { method: 'GET', url: '\/v3\/challenges'},
        { method: 'GET', url: '\/v2\/challenges'},

        // matchs everything besides /v3/members/{handle}/financial
        { method: 'GET', url: '\/v3\/members\/\\w+\/(?!financial)\\w*'}
      ];

      for (var i = 0; i < haveItAddItEndpoints.length; i++) {
        var obj = haveItAddItEndpoints[i];
        var re = new RegExp(obj.url);
        if (config.method.toUpperCase() === obj.method && re.test(config.url)) {
          if (TcAuthService.isAuthenticated()) {
            var token = config.url.indexOf('v2/') > -1 ? AuthTokenService.getV2Token() : AuthTokenService.getV3Token();
            if (token && !jwtHelper.isTokenExpired(token)) {
              return token;
            }
          }
          // else
          return null;
        }
      }

      // for everything else assume that we need to send token
      var idToken = config.url.indexOf('v2/') > -1 ? AuthTokenService.getV2Token() : AuthTokenService.getV3Token();

      if (!TcAuthService.isAuthenticated() || idToken == null) {
        $state.go('login');
        return;
      }
      // Note only v3tokens exoire
      if (!jwtHelper.isTokenExpired(idToken)) {
        return idToken;
      } else {
        return AuthTokenService.refreshV3Token(idToken).then(function(response) {
            idToken = response.data.result.content.token;
            // v2 token doesn't expire
            AuthTokenService.setV3Token(idToken);
            return idToken;
          })
          .catch(function(resp) {
            // must have expired, redirect to login?
            $state.go('login');
            return null;
          });
      }
    }
    return service;
  };
})();
