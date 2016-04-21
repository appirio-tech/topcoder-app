import angular from 'angular'
import _ from 'lodash'
import { getCurrentUser } from '../services/userv3.service.js'
import { decodeToken } from 'tc-accounts'

(function() {
  'use strict'

  angular.module('tc.services').factory('UserService', UserService)

  UserService.$inject = ['CONSTANTS', 'ApiService', '$injector', 'UserPrefStore', 'logger']

  function UserService(CONSTANTS, ApiService, $injector, UserPrefStore, logger) {

    var api = ApiService.getApiServiceProvider('USER')

    var _config = {
      cache: false,
      skipAuthorization: true
    }

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
      getV2UserProfile: getV2UserProfile,
      addSocialProfile: addSocialProfile,
      removeSocialProfile: removeSocialProfile,
      getPreference: getPreference,
      setPreference: setPreference
    }
    return service

    //////////////////////////////////////////

    function getUserIdentity() {
      var currentUser = getCurrentUser()
      if (currentUser) {
        return decodeToken(currentUser.token)
      } else {
        return null
      }
    }

    function createUser(body) {
      return api.all('users').withHttpConfig(_config).customPOST(JSON.stringify(body))
    }

    function validateUserHandle(handle) {
      return api.all('users').withHttpConfig(_config).customGET('validateHandle', {handle: handle})
    }


    function validateUserEmail(email) {

      return api.all('users').withHttpConfig(_config).customGET('validateEmail', {email: email})
    }

    function generateResetToken(email) {
      return api.all('users').withHttpConfig(_config).customGET('resetToken', {email: email})
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
      }
      return api.all('users').one('resetPassword').withHttpConfig(_config).customPUT(JSON.stringify(data))
    }

    function updatePassword(newPassword, oldPassword) {
      var userId = getUserIdentity().userId

      var body = {
        param: {
          credential: {
            password: newPassword,
            currentPassword: oldPassword
          }
        }
      }

      return api.one('users', userId).patch(JSON.stringify(body))
    }

    function validateSocialProfile(userId, provider) {
      return api.all('users').withHttpConfig(_config).customGET('validateSocial',
        {
          socialUserId: userId,
          socialProvider: provider
        })
    }

    function getUserProfile(queryParams) {
      var userId = getUserIdentity().userId
      return api.one('users', userId).get(queryParams)
    }

    function addSocialProfile(userId, profileData) {
      return api.one('users', userId).customPOST(profileData, 'profiles', {}, {})
    }

    function removeSocialProfile (userId, account) {
      return api.one('users', userId).one('profiles', account).remove()
    }

    /**
     * Temporary end point for getting member's badges/achievements. This endpoint
     * should be removed once we have it in v3.
     */
    function getV2UserProfile(handle) {
      return ApiService.restangularV2.one('users', handle).get()
    }

    function getPreference(prefName) {
      var obj = UserPrefStore.get('preferences')
      return _.get(obj, prefName)
    }

    function setPreference(prefName, val) {
      var obj = UserPrefStore.get('preferences') || {}
      obj[prefName] = val
      UserPrefStore.set('preferences', obj)
    }
  }

})()
