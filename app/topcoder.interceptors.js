(function() {
  'use strict';
  var HeaderInterceptor, JwtConfig, Restangular2, Restangular3;

  JwtConfig = function($httpProvider, jwtInterceptorProvider) {
    var jwtInterceptor;
    /*
     * Use cases ->
     *
     *  1. Endpoints what should never need authToken  - skipAuthEndpoints
     *  2. Endpoints that don't *need* authtokens, but if you have them add them
     *    - determine what token to send based on v2 or v3
     *  3. Endpoints that absolutely need tokens -
     *    - determine what token to send based on v2 or v3
     */

     var haveItAddItEndpoints = [
      {method: 'GET', url: '/v3/challenges'},
     ];

     // rest of the endpoints all require auth token


    jwtInterceptor = function(jwtHelper, AuthTokenService, TcAuthService, config) {
      var found = false;
      if (config.url.indexOf('.html') > -1)
        return '';
      for (var i=0; i < haveItAddItEndpoints.length; i++) {
        var obj = haveItAddItEndpoints[0];
        if ((config.method.toUpperCase() === "OPTIONS" || config.method.toUpperCase() === obj.method) && config.url.indexOf(obj.url) > -1) {
          // add token if we have it and if it hasn't expired
          if (TcAuthService.isAuthenticated()) {
            // FIXME looks like the services still need v2 token
            var token = config.url.indexOf('v2/') > -1 ? AuthTokenService.getV2Token() : AuthTokenService.getV2Token();
            if (!jwtHelper.isTokenExpired(token)) {
              return token;
            }
          }
          return '';
        }
      }

      // for everything else assume that we need to send token
      var idToken;
      if (config.url.indexOf('v2/') > -1) {
        idToken = AuthTokenService.getV2Token();
      } else if(config.url.indexOf('v3/') > -1) {
        // FIXME looks like the services still need v2 token
        if(config.url.indexOf('v3/users') > -1) {
          idToken = AuthTokenService.getV3Token();
        } else {
          idToken = AuthTokenService.getV2Token();
        }
      }
      // make sure token hasn't expired
      if (idToken != null) {
        if (jwtHelper.isTokenExpired(idToken)) {
          return AuthTokenService.refreshToken(idToken).then(
            function(response) {
              idToken = response.data.result.content.token;
              // v2 token doesn't expire
              AuthTokenService.setV3Token(idToken);
              return idToken;
            }
          );
        } else {
          return idToken;
        }
      } else {
        return '';
      }
    };


    jwtInterceptor.$inject = ['jwtHelper', 'AuthTokenService', 'TcAuthService', 'config'];
    jwtInterceptorProvider.tokenGetter = jwtInterceptor;
    return $httpProvider.interceptors.push('jwtInterceptor');
  };

  HeaderInterceptor = function() {
    var attach;
    return attach = {
      request: function(request) {
        request.headers['Accept'] = 'application/json';
        request.headers['Content-Type'] = 'application/json';
        return request;
      }
    };
  };

  angular.module('topcoder').factory('HeaderInterceptor', HeaderInterceptor);
  angular.module('topcoder').config(['$httpProvider', 'jwtInterceptorProvider', JwtConfig]);

})();
