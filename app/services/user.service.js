(function() {
  'use strict';

  angular.module('topcoder').factory('user', user);

  user.$inject = ['CONSTANTS', 'api'];

  function user(CONSTANTS, api) {
    var service = {
      getUsername: getUsername
    };
    return service;

    ///////////////

    function getUsername() {
      var url = CONSTANTS.API_URL_V2 + '/user/identity';
      return api.requestHandler('GET', url);
    }
  }

})();
