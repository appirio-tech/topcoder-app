(function() {
  'use strict';

  angular.module('tc.services').factory('UserService', UserService);

  UserService.$inject = ['CONSTANTS', 'ApiService', 'AuthTokenService', '$http', 'store', 'jwtHelper'];

  function UserService(CONSTANTS, ApiService, AuthTokenService, http, store, jwtHelper) {
    var service = {
      getUserIdentity: getUserIdentity,
      setUserIdentity: setUserIdentity,
      createUser: createUser,
      validateUserEmail: validateUserEmail,
      validateUserHandle: validateUserHandle,
      validateSocialProfile: validateSocialProfile,
      generateResetToken: generateResetToken,
      resetPassword: resetPassword
    };
    return service;

    ///////////////
    var _config = {
      cache: false,
      skipAuthorization: true
    };

    function getUserIdentity() {
      return JSON.parse(store.get('userObj'));
    }

    function setUserIdentity(token) {
      if (!token) {
        store.remove('userObj');
      } else {
        store.set('userObj', JSON.stringify(jwtHelper.decodeToken(token)));
      }
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

    function validateSocialProfile(userId, providerId) {
      return ApiService.restangularV3.all('users').withHttpConfig({cache: false}).customGET('validateSocial',
      {
        socialUserId: userId,
        socialProviderId: providerId
      });
    }

  }

})();
