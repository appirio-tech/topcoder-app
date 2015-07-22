(function() {
  'use strict';

  angular.module('tc.services').factory('UserService', UserService);

  UserService.$inject = ['CONSTANTS', 'ApiService', 'AuthTokenService', '$http'];

  function UserService(CONSTANTS, ApiService, AuthTokenService, http) {
    var _currentUser = null;

    var service = {
      getUser: getUser,
      getUserInfo: getUserInfo,
      setUserInfo: setUserInfo,
      getUsername: getUsername,
      createUser: createUser,
      validateUserEmail: validateUserEmail,
      validateUserHandle: validateUserHandle,
      generateResetToken: generateResetToken,
      resetPassword: resetPassword,
      getUserId: getUserId
    };
    return service;

    ///////////////

    function getUser(userId) {
      return ApiService.restangularV3.one('users', userId).get();
    }

    function getUserInfo() {
      return _currentUser;
    }

    function setUserInfo(user) {
      _currentUser = user;
    }

    function getUserId() {
      var token = AuthTokenService.getV3Token();
      var decoded = AuthTokenService.decodeToken(token);
      return decoded.userId;
    }

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
      return ApiService.restangularV3.all('users').withHttpConfig({cache: false}).customGET('resetToken', {email: email});
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
