(function() {
  'use strict';
  var HeaderInterceptor, JwtConfig;

  JwtConfig = function($httpProvider, jwtInterceptorProvider) {
    var jwtInterceptor;
    jwtInterceptor = function(jwtHelper, authtoken) {
      var idToken;
      idToken = authtoken.getToken('userJWTToken');
      if (idToken != null) {
        if (jwtHelper.isTokenExpired(idToken)) {
          return authtoken.refreshToken(idToken).then(function(response) {
            idToken = response.data.result.content.token;
            authtoken.setToken(idToken);
            return idToken;
          });
        } else {
          return idToken;
        }
      } else {
        return '';
      }
    };
    jwtInterceptor.$inject = ['jwtHelper', 'authtoken'];
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
