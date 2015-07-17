(function() {
  'use strict';
  var HeaderInterceptor, JwtConfig, Restangular2, Restangular3;

  JwtConfig = function($httpProvider, jwtInterceptorProvider) {
    var jwtInterceptor;
    jwtInterceptor = function(jwtHelper, AuthTokenService, config) {
      // based on the url decide which token to send
      var idToken;
      if (config.url.indexOf('v2/') > -1) {
        idToken = AuthTokenService.getV2Token();
      } else if(config.url.indexOf('v3/') > -1 && config.url.indexOf('v3/authorizations') < 0) {
        // FIXME looks like the services still need v2 token
        idToken = AuthTokenService.getV2Token();
      }
      // make sure token hasn't expired
      if (idToken != null) {
        if (jwtHelper.isTokenExpired(idToken)) {
          return AuthTokenService.refreshToken(idToken).then(function(response) {
            idToken = response.data.result.content.token;
            // v2 token doesn't expire
            AuthTokenService.setV3Token(idToken);
            return idToken;
          });
        } else {
          return idToken;
        }
      } else {
        return '';
      }
    };
    jwtInterceptor.$inject = ['jwtHelper', 'AuthTokenService', 'config'];
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
