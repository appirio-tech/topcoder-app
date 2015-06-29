(function() {
  'use strict';

  angular.module('topcoder').factory('profile', profile);

  profile.$inject = ['CONSTANTS', 'ApiService', 'UserService'];

  function profile() {
    var service = {
      getUserProfile: getUserProfile
    };
    return service;

    ///////////////

    function getUserProfile() {
      UserService.getUsername()
      .then(function(response) {
        ApiService.requestHandler('GET', CONSTANTS.API_URL_V2 + '/users/' + response.data.handle);
      });
    }
  }

})();
