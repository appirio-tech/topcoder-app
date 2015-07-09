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
      userService.getUsername()
      .then(function(response) {
        api.requestHandler('GET', CONSTANTS.API_URL_V2 + '/users/' + response.data.handle);
      });
    }
  }

})();
