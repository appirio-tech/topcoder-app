(function() {
  'use strict';

  angular.module('topcoder').factory('profile', profile);

  profile.$inject = ['CONSTANTS', 'api', 'userService'];

  function profile(CONSTANTS, api, userService) {
    var service = {
      getUserProfile: getUserProfile
    };
    return service;

    ///////////////

    function getUserProfile() {
      return userService.getUsername()
      .then(function(response) {
        return api.requestHandler('GET', CONSTANTS.API_URL_V2 + '/users/' + response.data.handle);
      });
    }
  }

})();
