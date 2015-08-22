(function() {
  'use strict';

  angular.module('tc.services').factory('UserService', UserService);

  UserService.$inject = ['CONSTANTS', 'ApiService', '$injector', 'AuthTokenService', '$http', 'store', 'jwtHelper'];

  function UserService(CONSTANTS, ApiService, $injector, AuthTokenService, http, store, jwtHelper) {

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
      resetPassword: resetPassword
    };
    return service;
    ///////////////

    function getUserIdentity() {
      var TcAuthService = $injector.get('TcAuthService');
      if (TcAuthService.isAuthenticated()) {
        var decodedToken = AuthTokenService.decodeToken(AuthTokenService.getV3Token());
        return decodedToken;
      } else {
        return null;
      }
    }

    // function setUserIdentity(token) {
    //   if (!token) {
    //     store.remove('userObj');
    //   } else {
    //     store.set('userObj', JSON.stringify(token));
    //   }
    // }

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
      return ApiService.restangularV3.all('users').one('resetPassword').withHttpConfig(_config).customPUT(JSON.stringify(data));
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
