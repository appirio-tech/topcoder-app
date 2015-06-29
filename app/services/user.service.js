(function() {
  'use strict';

  angular.module('topcoder').factory('user', user);

  user.$inject = ['CONSTANTS', 'ApiService', 'jwtHelper', 'AuthToken'];

  function user() {
    var service = {
      getUsername: getUsername
    };
    return service;

    ///////////////

    function getUsername() {
      url = CONSTANTS.API_URL_V2 + '/user/identity';
      ApiService.requestHandler('GET', url);
    }
  }

})();
