(function() {
  'use strict';

  angular.module('topcoder').factory('api', api);

  api.$inject = ['$http', 'authtoken', 'Restangular', 'CONSTANTS'];

  function api($http, authtoken, Restangular, CONSTANTS) {
    var service = {
      requestHandler: requestHandler,
      restangularV3: getRestangularV3()
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

    // RESTANGULAR config

    var _errorInterceptor = function(response) {
      switch (response.status) {
        case 403: // FORBIDDEN
        case 500: // SERVER ERROR
        case 503: // HTTP_503_SERVICE_UNAVAILABLE
          $log.error(response);
          return false; // error handled
        default:
          return true; // error not handled
      }
    };

    function getRestangularV3() {
      var _restangularV3 = Restangular.withConfig(function(Configurer) {
        Configurer
          .setBaseUrl(CONSTANTS.API_URL)
          .setDefaultHttpFields({
            cache: true
          })
          .addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var extractedData = null;
            if (operation === 'getList') {
              // FIXME
              extractedData = data.results;
              extractedData.meta = {
                count: data.count,
                next: data.next,
                previous: data.previous
              }
            } else {
              extractedData = data;
            }
            return extractedData;
          })
          .setErrorInterceptor(function(response) {
            return _errorInterceptor(response);
          });
      });
      return _restangularV3;
    }
  }

})();
