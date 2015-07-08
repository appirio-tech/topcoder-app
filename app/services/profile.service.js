(function() {
  'use strict';

  angular.module('topcoder').factory('profile', profile);

  profile.$inject = ['CONSTANTS', 'api', 'UserService'];

  function profile(CONSTANTS, api, UserService) {
    var service = {
      getUserProfile: getUserProfile
    };
    return service;

    ///////////////

    function getUserProfile() {
      UserService.getUsername()
      .then(function(response) {
        api.requestHandler('GET', CONSTANTS.API_URL_V2 + '/users/' + response.data.handle);
      });
    }
  }

})();
