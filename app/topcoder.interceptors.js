(function() {
  'use strict';
  var HeaderInterceptor, JwtConfig, Restangular2, Restangular3;

  JwtConfig = function($httpProvider, jwtInterceptorProvider) {
    var jwtInterceptor;
    jwtInterceptor = function(jwtHelper, authtoken, config) {
      // based on the url decide which token to send
      var idToken;
      if (config.url.indexOf('v2/') > -1) {
        idToken = authtoken.getV2Token();
      } else if(config.url.indexOf('v3/') > -1 && config.url.indexOf('v3/authorizations') < 0) {
        // FIXME looks like the services still need v2 token
        idToken = authtoken.getV2Token();
      }
      // make sure token hasn't expired
      if (idToken != null) {
        if (jwtHelper.isTokenExpired(idToken)) {
          return authtoken.refreshToken(idToken).then(function(response) {
            idToken = response.data.result.content.token;
            // v2 token doesn't expire
            authtoken.setV3Token(idToken);
            return idToken;
          });
        } else {
          return idToken;
        }
      } else {
        return '';
      }
    };
    jwtInterceptor.$inject = ['jwtHelper', 'authtoken', 'config'];
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

  Restangular3 = function(Restangular, CONSTANTS) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(CONSTANTS.API_URL);
    });
  };

  angular.module('topcoder').factory('Restangular3', ['Restangular', 'CONSTANTS', Restangular3]);

  Restangular2 = function(RestangularProvider, CONSTANTS) {
    RestangularProvider.setBaseUrl(CONSTANTS.API_URL_V2);

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      extractedData = '';
      extractedData = data.data ? data.data : data;
      if (operation === 'getList') {
        if (!(Object.prototype.toString.call(extractedData) === '[object Array]')) {
          extractedData = [extractedData];
        }
        extractedData.pagination = {
          total: data.total,
          pageIndex: data.pageIndex,
          pageSize: data.pageSize
        };
      }
      return extractedData;
    });
  };

  angular.module('topcoder').config(['RestangularProvider', 'CONSTANTS', Restangular2]);
})();
