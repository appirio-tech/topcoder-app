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
      return UserService.getUsername().then(function(res) {
        var handle = res.data.handle;

        return ApiService.requestHandler('GET', CONSTANTS.API_URL_V2 + '/users/' + handle);
      });
    }
  }

})();
