(function() {
  'use strict';

  angular.module('tc.services').factory('ProfileService', ProfileService);

  ProfileService.$inject = ['CONSTANTS', 'ApiService', 'UserService', '$q'];

  function ProfileService(CONSTANTS, ApiService, UserService, $q) {
    var service = {
      getUserProfile: getUserProfile
    };
    return service;

    ///////////////

    function getUserProfile() {
      var usernamePromise = UserService.getUsername();
      var profilePromise = usernamePromise.then(function(response) {
        return ApiService.requestHandler('GET', CONSTANTS.API_URL_V2 + '/users/' + response.data.handle);
      });
      return $q.all([usernamePromise, profilePromise]);
    }
  }

})();
