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
      resetPassword: resetPassword,
      getUserProfile: getUserProfile
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
        store.set('userObj', JSON.stringify(token));
      }
    }

    function createUser(body) {
      return ApiService.restangularV3.all('users').withHttpConfig(_config).customPOST(JSON.stringify(body));
    }

    function validateUserHandle(handle) {
      return ApiService.restangularV3.all('users').withHttpConfig(_config).customGET('validateHandle', {handle: handle});
    }


    function validateUserEmail(email) {

      return ApiService.restangularV3.all('users').withHttpConfig(_config).customGET('validateEmail', {email: email});
    }

    function generateResetToken(email) {
      return ApiService.restangularV3.all('users').withHttpConfig(_config).customGET('resetToken', {email: email});
    }

    function resetPassword(handle, newPassword, resetToken) {
      var data = {
        param: {
          handle: handle,
          credential: {
            password: newPassword,
            resetToken: resetToken
          }
        }
      };
      return ApiService.restangularV3.all('users').withHttpConfig(_config).one('resetPassword').customPUT(JSON.stringify(data));
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

    /**
     * Temporary end point for getting member's badges/achievements. This endpoint
     * should be removed once we have it in v3.
     */
    function getUserProfile(handle) {
      return ApiService.restangularV2.one('users', handle).get();
    }

  }

})();
