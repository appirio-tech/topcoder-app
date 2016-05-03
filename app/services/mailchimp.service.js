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


    function addSubscription(user) {
      var subscription = {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        interests: {}
      }
      subscription.interests[CONSTANTS.MAILCHIMP_NL_TCO] = true
      subscription.interests[CONSTANTS.MAILCHIMP_NL_IOS] = true
      subscription.interests[CONSTANTS.MAILCHIMP_NL_DEV] = true
      subscription.interests[CONSTANTS.MAILCHIMP_NL_DESIGN] = true
      subscription.interests[CONSTANTS.MAILCHIMP_NL_DATA] = true
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
