(function() {
  'use strict';

  angular.module('tc.services').factory('UserService', UserService);

  UserService.$inject = ['CONSTANTS', 'ApiService', '$http'];

  function UserService(CONSTANTS, ApiService, http) {
    var service = {
      getUsername: getUsername,
      createUser: createUser,
      validateUserEmail: validateUserEmail,
      validateUserHandle: validateUserHandle,
      generateResetToken: generateResetToken,
      resetPassword: resetPassword
    };
    return service;

    ///////////////

    function getUsername() {
      var url = CONSTANTS.API_URL_V2 + '/user/identity';
      return ApiService.requestHandler('GET', url);
    }

    function createUser(body) {
      return ApiService.restangularV3.all('users').withHttpConfig({cache: false}).customPOST(JSON.stringify(body));
    }

    function validateUserHandle(handle) {
      return ApiService.restangularV3.all('users').withHttpConfig({cache: false}).customGET('validate/handle/' + handle);
    }


    function validateUserEmail(email) {
      return ApiService.restangularV3.all('users').withHttpConfig({cache: false}).customGET('validateEmail', {email: email});
    }

    function generateResetToken(email) {
      return api.restangularV3.all('users').withHttpConfig({cache: false}).customGET('resetToken', {email: email});
    }

    function resetPassword(handle, newPassword, resetToken) {
      var data = {
        params: {
          handle: handle,
          credential: {
            password: newPassword,
            resetToken: resetToken
          }
        }
      };
      return $http.put(CONSTANTS.API_URL + '/users/resetPassword', data);
    }
  }

})();
