(function() {
  'use strict';

  angular.module('tc.services').factory('ApiService', ApiService);

  ApiService.$inject = ['$http', '$log', 'AuthTokenService', 'Restangular', 'CONSTANTS'];

  function ApiService($http, $log, AuthTokenService, Restangular, CONSTANTS) {
    var service = {
      requestHandler: requestHandler,
      restangularV2: _getRestangularV2(),
      restangularV3: _getRestangularV3()
    };
    return service;

    ///////////////

    function requestHandler(method, url, data, noAuthHeader) {
      var options = {
        method: method,
        url: url,
        headers: {}
      };

      if (data && method !== 'GET') {
        options.data = data;
      }

      if (data && method === 'GET') {
        options.params = data;
      }

      if (method === 'POST') {
        options.headers['Content-Type'] = 'application/json';
      }

      return $http(options);
    }

    function _getRestangularV2() {
      var baseUrl = CONSTANTS.API_URL_V2;
      var _restangular = Restangular.withConfig(function(Configurer) {
        Configurer
          .setBaseUrl(baseUrl)
          .setDefaultHttpFields({
            cache: false
          })
          .addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            // Just return raw data
            return data;
          })
          .setErrorInterceptor(function(response) {
            // TODO
            switch (response.status) {
              case 403: // FORBIDDEN
              case 500: // SERVER ERROR
              case 503: // HTTP_503_SERVICE_UNAVAILABLE
              default:
                $log.error("Restangular Error Interceptor" + JSON.stringify(response));
                return true; // error not handled
            }
          });
        });
      return _restangular;
    }

    function _getRestangularV3() {
      var baseUrl = CONSTANTS.API_URL;
      var _restangular = Restangular.withConfig(function(Configurer) {
        Configurer
          .setBaseUrl(baseUrl)
          .setDefaultHttpFields({
            cache: false
          })
          .addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            if (data != null) {
              var extractedData = null;
              if (operation === 'getList') {
                extractedData = data.result.content;
                if (data.result.metadata) {
                  extractedData.metadata = {totalCount: data.result.metadata.totalCount};
                } else {
                  extractedData.metadata = null;
                }
              } else {
                extractedData = data.result.content;
              }
              return extractedData;
            } else {
              return null; // data
            }
          })
          .setErrorInterceptor(function(response) {
            // TODO
            switch (response.status) {
              case 403: // FORBIDDEN
              case 500: // SERVER ERROR
              case 503: // HTTP_503_SERVICE_UNAVAILABLE
              default:
                $log.error("Restangular Error Interceptor ", response);
                return true; // error not handled
            }
          });
        });
      return _restangular;
    }

  }

})();
