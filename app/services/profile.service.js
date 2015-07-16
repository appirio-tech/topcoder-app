(function() {
  'use strict';

  angular.module('topcoder').factory('profile', profile);

  profile.$inject = ['CONSTANTS', 'api', 'UserService', '$q'];

  function profile(CONSTANTS, api, UserService, $q) {
    var service = {
      getUserProfile: getUserProfile
    };
    return service;

    ///////////////

    function getUserProfile() {
      var usernamePromise = UserService.getUsername();
      var profilePromise = usernamePromise.then(function(response) {
        return api.requestHandler('GET', CONSTANTS.API_URL_V2 + '/users/' + response.data.handle);
      });
      return $q.all([usernamePromise, profilePromise]);
    }
  }

})();
