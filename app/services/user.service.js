(function() {
  'use strict';

  angular.module('tc.services').factory('UserService', UserService);

  UserService.$inject = ['CONSTANTS', 'ApiService', '$injector', 'AuthTokenService'];

  function UserService(CONSTANTS, ApiService, $injector, AuthTokenService) {

    var api = ApiService.restangularV3;

    var _config = {
      cache: false,
      skipAuthorization: true
    };

    var service = {
      getUserIdentity: getUserIdentity,
      createUser: createUser,
      validateUserEmail: validateUserEmail,
      validateUserHandle: validateUserHandle,
      validateSocialProfile: validateSocialProfile,
      generateResetToken: generateResetToken,
      resetPassword: resetPassword,
      updatePassword: updatePassword,
      getUserProfile: getUserProfile,
      getV2UserProfile: getV2UserProfile
    };
    return service;

    //////////////////////////////////////////

    function getUserIdentity() {
      var TcAuthService = $injector.get('TcAuthService');
      if (TcAuthService.isAuthenticated()) {
        var decodedToken = AuthTokenService.decodeToken(AuthTokenService.getV3Token());
        return decodedToken;
      } else {
        return null;
      }
    }

    function createUser(body) {
      return api.all('users').withHttpConfig(_config).customPOST(JSON.stringify(body));
    }

    function validateUserHandle(handle) {
      return api.all('users').withHttpConfig(_config).customGET('validateHandle', {handle: handle});
    }


    function validateUserEmail(email) {

      return api.all('users').withHttpConfig(_config).customGET('validateEmail', {email: email});
    }

    function generateResetToken(email) {
      return api.all('users').withHttpConfig(_config).customGET('resetToken', {email: email});
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
      return api.all('users').one('resetPassword').withHttpConfig(_config).customPUT(JSON.stringify(data));
    }

    function updatePassword(newPassword, oldPassword) {
      var userId = getUserIdentity().userId;

      var body = {
        param: {
          credential: {
            password: newPassword,
            currentPassword: oldPassword
          }
        }
      };

      return api.one('users', userId).patch(JSON.stringify(body));
    }

    function validateSocialProfile(userId, provider) {
      return api.all('users').withHttpConfig(_config).customGET('validateSocial',
      {
        socialUserId: userId,
        socialProvider: provider
      });
    }

    function getUserProfile(queryParams) {
      var userId = getUserIdentity().userId;
      return api.one('users', userId).get(queryParams);
    }

    /**
     * Temporary end point for getting member's badges/achievements. This endpoint
     * should be removed once we have it in v3.
     */
    function getV2UserProfile(handle) {
      return ApiService.restangularV2.one('users', handle).get();
    }
  }

})();
