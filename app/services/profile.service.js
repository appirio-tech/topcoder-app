(function() {
  'use strict';

  angular.module('tc.services').factory('ProfileService', ProfileService);

  ProfileService.$inject = ['CONSTANTS', 'ApiService', 'UserService'];

  function ProfileService(CONSTANTS, ApiService, UserService) {
    var service = {
      getUserProfile: getUserProfile
    };
    return service;

    ///////////////

    function getUserProfile() {
      // TODO needs refactoring, probably don't need $q.all since profilePromise uses the response from usernamePromise
      var usernamePromise = UserService.getUsername();
      var profilePromise = usernamePromise.then(function(response) {
        return ApiService.requestHandler('GET', CONSTANTS.API_URL_V2 + '/users/' + response.data.handle);
      });
      return $q.all([usernamePromise, profilePromise]);
    }
  }

})();
