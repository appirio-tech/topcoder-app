import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.settings').controller('EmailSettingsController', EmailSettingsController)

  EmailSettingsController.$inject = ['$rootScope', 'userData', 'ProfileService', 'UserPreferencesService', 'logger', 'CONSTANTS', 'toaster', '$q', '$scope']

  function EmailSettingsController($rootScope, userData, ProfileService, UserPreferencesService, logger, CONSTANTS, toaster, $q, $scope) {
    var vm = this
    vm.loading = false
    vm.saving = false
    vm.isDirty = isDirty
    vm.save = save

    activate()

    function activate() {
      vm.newsletters = [
        {
          id: 'TOPCODER_NL_GEN',
          name: 'General Newsletter',
          desc: 'News summary from all tracks and programs',
          enabled: false,
          dirty: false
        },
        {
          id: 'TOPCODER_NL_DESIGN',
          name: 'Design Newsletter',
          desc: 'Website, mobile, and product design; UI and UX',
          enabled: false,
          dirty: false
        },
        {
          id: 'TOPCODER_NL_DEV',
          name: 'Development Newsletter',
          desc: 'Software architecture, component assembly, application development, and bug hunting',
          enabled: false,
          dirty: false
        },
        {
          id: 'TOPCODER_NL_DATA',
          name: 'Data Science Newsletter',
          desc: 'Algorithm and data structures, statistical analysis',
          enabled: false,
          dirty: false
        },
        {
          id: 'TOPCODER_NL_IOS',
          name: 'iOS Community Newsletter',
          desc: 'Mobile app design and development for iOS, with Swift emphasis',
          enabled: false,
          dirty: false
        },
        {
          id: 'TOPCODER_NL_TCO',
          name: 'TCO Newsletter',
          desc: 'Our annual online and onsite tournament to celebrate and reward the community',
          enabled: false,
          dirty: false
        },
        {
          id: 'TOPCODER_NL_PREDIX',
          name: 'Predix Community Newsletter',
          desc: 'Design and development on GE’s platform for the Industrial Internet of Things',
          enabled: false,
          dirty: false
        },
        {
          id: 'TOPCODER_NL_IBM_COGNITIVE',
          name: 'Cognitive Community Newsletter',
          desc: 'Never miss out on info about the Topcoder Cognitive Community',
          enabled: false,
          dirty: false
        }
      ]

      vm.loading = true
      return UserPreferencesService.getEmailPreferences(userData).then(function(subscription) {
        vm.loading = false
        if (!subscription) {
          // add member to the list with default preferences
          UserPreferencesService.saveEmailPreferences(userData).then(function(resp) {
            logger.debug(JSON.stringify(resp))
            validateState(resp)

          }).catch(function(err) {
            // no error to user
            //TODO some error alert to community admin
            logger.debug('error in adding user to member list')    
          })
        } else {
          if (subscription) {
            validateState(subscription)
          }
        }
      })
    }

    function validateState(subscription) {
      vm.newsletters.forEach(function(newsletter) {
        if (subscription[newsletter.id]) {
          newsletter.enabled = true
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
      UserPreferencesService.saveEmailPreferences(userData, preferences).then(function(resp) {
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
