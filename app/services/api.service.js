(function() {
  'use strict';

  angular.module('topcoder').factory('api', api);

  api.$inject = ['$http', 'authtoken'];

  function api($http, authtoken) {
    var service = {
      requestHandler: requestHandler
    };
    return service;

    ///////////////

    function requestHandler(method, url, data, noAuthHeader) {
      var options = {
        method : method,
        url    : url,
        headers: {}
      };

      var token = authtoken.getToken();

      if(token && !noAuthHeader) {
        options.headers = {
          Authorization: 'Bearer ' + token
        };
      }

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
  }

})();
