(function() {
  'use strict';
  var JwtConfig;

  JwtConfig = function($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['config', 'JwtInterceptorService', function(config, JwtInterceptorService) {
      return JwtInterceptorService.getToken(config);
    }];
    return $httpProvider.interceptors.push('jwtInterceptor');
  };

  angular.module('topcoder').config(['$httpProvider', 'jwtInterceptorProvider', JwtConfig]);

})();
