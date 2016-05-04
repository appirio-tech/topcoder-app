import angular from 'angular'
import _ from 'lodash'

(function () {
  'use strict'

  angular.module('tc.settings').controller('EmailSettingsController', EmailSettingsController)

  EmailSettingsController.$inject = ['$rootScope', 'userProfile', 'ProfileService', 'MailchimpService', 'logger', 'CONSTANTS', 'toaster', '$q', '$scope']

  function EmailSettingsController($rootScope, userProfile, ProfileService, MailchimpService, logger, CONSTANTS, toaster, $q, $scope) {
    var vm = this
    vm.loading = false
    vm.saving = false
    vm.isDirty = isDirty
    vm.save = save

    activate()

    function activate() {
      vm.newsletters = [
        {
          id: CONSTANTS.MAILCHIMP_NL_DEV,
          name: 'Developer Newsletter',
          desc: 'Software architecture, component assembly, application development and bug hunting',
          enabled: false,
          dirty: false
        },
        {
          id: CONSTANTS.MAILCHIMP_NL_DESIGN,
          name: 'Design Newsletter',
          desc: 'Website, mobile, and product design; UI and UX',
          enabled: false,
          dirty: false
        },
        {
          id: CONSTANTS.MAILCHIMP_NL_DATA,
          name: 'Data Science Newsletter',
          desc: 'Algorithm and data structures, statistical analysis',
          enabled: false,
          dirty: false
        },
        {
          id: CONSTANTS.MAILCHIMP_NL_TCO,
          name: 'TCO Newsletter',
          desc: 'Software architecture, component assembly, application development and bug hunting',
          enabled: false,
          dirty: false
        },
        {
          id: CONSTANTS.MAILCHIMP_NL_IOS,
          name: 'iOS Community Newsletter',
          desc: 'Software architecture, component assembly, application development and bug hunting',
          enabled: false,
          dirty: false
        }
      ]

      vm.loading = true
      MailchimpService.getMemberSubscription(userProfile).then(function(resp) {
        vm.loading = false
        if (resp.interests) {
          vm.newsletters.forEach(function(newsletter) {
            if (resp.interests[newsletter.id]) {
              newsletter.enabled = true
            }
          })
        }
      })
    }

    function isDirty() {
      var dirty = false
      vm.newsletters.forEach(function(newsletter) {
        if (newsletter.dirty){
          dirty = true
        }
      })
      return dirty
    }

    function save() {
      vm.saving = true
      var preferences = {}
      vm.newsletters.forEach(function(newsletter) {
        preferences[newsletter.id] = newsletter.enabled
      })
      MailchimpService.addSubscription(userProfile, preferences).then(function(resp) {
        vm.loading = false
        vm.saving = false
        // reset dirty state for all newsletter options
        vm.newsletters.forEach(function(newsletter) {
          newsletter.dirty = false
        })
        toaster.pop('success', 'Success!', 'Preferences updated.')
      }).catch(function(err) {
        logger.error('Could not update email preferences', err)
        vm.loading = false
        vm.saving = false

        toaster.pop('error', 'Whoops!', 'Something went wrong. Please try again later.')
      })
    }
  }
})()
