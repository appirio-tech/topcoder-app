(function() {
  'use strict';

  angular.module('tc.services').factory('UserService', UserService);

  UserService.$inject = ['CONSTANTS', 'ApiService', '$http', '$injector', 'store'];

  function UserService(CONSTANTS, ApiService, http, $injector, store) {
    var _user = null;
    var service = {
      getUsername: getUsername,
      getUser: getUser,
      createUser: createUser,
      validateUserEmail: validateUserEmail,
      validateUserHandle: validateUserHandle,
      generateResetToken: generateResetToken,
      resetPassword: resetPassword,
      getUserId: getUserId
    };
    return service;

    ///////////////
    function getUserId() {
      var AuthTokenService = $injector.get('AuthTokenService');
      var token = AuthTokenService.getV3Token();
      var decoded = AuthTokenService.decodeToken(token);
      return decoded.userId;
    }

    var _config = {
      cache: false,
      skipAuthorization: true
    };
    function getUsername() {
      var url = CONSTANTS.API_URL_V2 + '/user/identity';
      return ApiService.requestHandler('GET', url);
    }

    function createUser(body) {
      return ApiService.restangularV3.all('users').withHttpConfig(_config).customPOST(JSON.stringify(body));
    }

    function validateUserHandle(handle) {
      return ApiService.restangularV3.all('users').withHttpConfig(_config).customGET('validate/handle/' + handle);
    }


    function validateUserEmail(email) {

      return ApiService.restangularV3.all('users').withHttpConfig(_config).customGET('validateEmail', {email: email});
    }

    function generateResetToken(email) {
      return api.restangularV3.all('users').withHttpConfig(_config).customGET('resetToken', {email: email});
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
      return $http({
        url: CONSTANTS.API_URL + '/users/resetPassword',
        method: 'put',
        skipAuthorization: true,
        data: data
      });
    }

    function getUser() {
      var TcAuthService = $injector.get('TcAuthService');
      if (TcAuthService.isAuthenticated()) {
        return JSON.parse(store.get('userObj'));
      } else {
        return null;
      }
    }
  }

})();
