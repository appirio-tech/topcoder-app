(function() {
  'use strict';

  angular.module('topcoder').factory('api', api);

  api.$inject = ['$http'];

  function api() {
    var service = {
      requestHandler: requestHandler
    };
    return service;

    ///////////////

    function requestHandler(method, url, data) {
      var options = {
        method : method,
        url    : url,
        headers: {}
      };

      if(data) {
        options.data = data;
      }

      $http(options);
    }
  }

})();
