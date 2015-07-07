(function() {
  'use strict';

  angular.module('topcoder').factory('user', user);

  user.$inject = ['CONSTANTS', 'api', '$http'];

  function user(CONSTANTS, api, http) {
    var service = {
      getUsername: getUsername,
      validateUserEmail: validateUserEmail,
      validateUserHandle: validateUserHandle,
      generateResetToken: generateResetToken,
      resetPassword: resetPassword
    };
    return service;

    ///////////////

    function getUsername() {
      var url = CONSTANTS.API_URL_V2 + '/user/identity';
      return api.requestHandler('GET', url);
    }

    function validateUserHandle(handle) {
      return api.restangularV3.all('users').withHttpConfig({cache: false}).customGET('validate/handle/' + handle);
    }


    function validateUserEmail(email) {
      return api.restangularV3.all('users').withHttpConfig({cache: false}).customGET('validateEmail', {email: email});
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
