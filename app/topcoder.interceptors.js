(function() {
  'use strict';
  var HeaderInterceptor, JwtConfig;

  JwtConfig = function($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['config', 'JwtInterceptorService', function(config, JwtInterceptorService) {
      return JwtInterceptorService.getToken(config);
    }];
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
