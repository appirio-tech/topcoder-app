import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('MailchimpService', MailchimpService)

  MailchimpService.$inject = ['$http', 'logger', 'Restangular', 'CONSTANTS', 'ApiService', '$q']

  function MailchimpService($http, logger, Restangular, CONSTANTS, ApiService, $q) {
    var mailchimpApi = ApiService.getApiServiceProvider('MAILCHIMP')
    var service = {
      getMemberSubscription: getMemberSubscription,
      addSubscription: addSubscription
    }
    return service

    function getMemberSubscription(user) {
      return $q(function(resolve, reject) {
        mailchimpApi.one('mailchimp/lists', CONSTANTS.MAILCHIMP_LIST_ID)
        .one('members', user.userId).get()
        .then(function(resp) {
          resolve(resp)
        })
        .catch(function(err) {
          if (err.status === 404) {
            logger.debug('Member subscription not found')
            resolve()
            return
          }
          logger.error('Error getting member to subscription list', err)

          var errorStatus = 'FATAL_ERROR'
          reject({
            status: errorStatus,
            msg: err.errorMessage
          })
        })
      })
    }


    function addSubscription(user, preferences) {
      var subscription = {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        interests: {}
      }
      if (!preferences) {
        subscription.interests[CONSTANTS.MAILCHIMP_NL_GEN] = true
      } else {
        subscription.interests = preferences
      }
      return $q(function(resolve, reject) {
        mailchimpApi.one('mailchimp/lists', CONSTANTS.MAILCHIMP_LIST_ID)
        .customPUT(subscription, 'members')
        .then(function(resp) {
          resolve(resp)
        })
        .catch(function(err) {
          logger.error('Error adding member to subscription list', err)

          var errorStatus = 'FATAL_ERROR'

          reject({
            status: errorStatus,
            msg: err.errorMessage
          })
        })
      })
    }
  }
})()
