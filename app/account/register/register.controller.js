import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tc.account').controller('RegisterController', RegisterController)

  RegisterController.$inject = ['$log', 'logger', 'CONSTANTS', '$state', '$stateParams', 'TcAuthService', 'UserService', 'ISO3166', 'Helpers']

  function RegisterController($log, logger, CONSTANTS, $state, $stateParams, TcAuthService, UserService, ISO3166, Helpers) {
    $log = $log.getInstance('RegisterController')
    $log.debug('-init')
    var vm = this
    vm.registering = false
    // prepares utm params, if available
    var utm = {
      source : $stateParams && $stateParams.utm_source ? $stateParams.utm_source : '',
      medium : $stateParams && $stateParams.utm_medium ? $stateParams.utm_medium : '',
      campaign : $stateParams && $stateParams.utm_campaign ? $stateParams.utm_campaign : ''
    }


    // Set default for toggle password directive
    vm.defaultPlaceholder = 'Create Password'
    vm.busyMessage = CONSTANTS.BUSY_PROGRESS_MESSAGE

    // FIXME - This needs to be setup with https
    // lookup users country
    // Helpers.getCountyObjFromIP()
    //   .then(function(obj) {
    //     vm.countryObj = obj
    //   })

    vm.countries = ISO3166.getAllCountryObjects()

    vm.updateCountry = function (angucompleteCountryObj) {
      var countryCode = _.get(angucompleteCountryObj, 'originalObject.code', undefined)

      var isValidCountry = _.isUndefined(countryCode) ? false : true
      vm.registerForm.country.$setValidity('required', isValidCountry)
      vm.isValidCountry = isValidCountry
      if (isValidCountry) {
        vm.country = angucompleteCountryObj.originalObject
      }
    }

    vm.register = function() {
      vm.registering = true
      var userInfo = {
        handle: vm.username,
        firstName: vm.firstname,
        lastName: vm.lastname,
        email: vm.email,
        country: {
          code: Helpers.npad(vm.country.code, 3),
          isoAlpha3Code: vm.country.alpha3,
          isoAlpha2Code: vm.country.alpha2
        },
        utmSource: utm.source,
        utmMedium: utm.medium,
        utmCampaign: utm.campaign
      }

      if (!vm.isSocialRegistration) {
        userInfo.credential = { password: vm.password }
      } else {
        userInfo.profile = {
          userId: vm.socialUserId,
          name: vm.firstname + ' ' + vm.lastname,
          email: vm.socialProfile.email,
          emailVerified: vm.socialProfile.email_verified,
          providerType: vm.socialProvider,
          context: {
            handle: vm.username,
            accessToken: vm.socialContext.accessToken
          }
        }
      }

      var body = {
        param: userInfo,
        options: {
          afterActivationURL: $state.href('skillPicker', {}, {absolute: true})
        }
      }

      $log.debug('attempting to register user')
      TcAuthService.register(body)
      .then(function(data) {
        vm.registering = false
        $log.debug('registered successfully')

        // In the future, go to dashboard
        $state.go('registeredSuccessfully')
      })
      .catch(function(err) {
        vm.registering = false

        logger.error('Error in registering new user', err)
      })
    }

    vm.socialRegister = function(provider) {
      TcAuthService.socialRegistration(provider, null)
      .then(function(resp) {
        if (resp.status === 'SUCCESS') {
          var socialData = resp.data
          vm.socialUserId = socialData.socialUserId
          vm.username = socialData.username
          if (socialData.username) {
            vm.registerForm.username.$setDirty()
          }
          vm.firstname = socialData.firstname
          if (socialData.firstname) {
            vm.registerForm.firstname.$setDirty()
          }
          vm.lastname = socialData.lastname
          if (socialData.lastname) {
            vm.registerForm.lastname.$setDirty()
          }
          if (socialData.email) {
            vm.registerForm.email.$setDirty()
          }
          vm.email = socialData.email
          vm.socialProfile = socialData.socialProfile
          vm.socialProvider = socialData.socialProvider
          vm.socialContext= {'accessToken':  socialData.accessToken}
          vm.isSocialRegistration = true
        } else {
          vm.isSocialRegistration = false
        }
      })
      .catch(function(err) {
        switch (err.status) {
        case 'SOCIAL_PROFILE_ALREADY_EXISTS':
          vm.errMsg = 'An account with that profile already exists. Please login to access your account.'

          logger.error('Error registering user with social account', err)

          break

        default:
          vm.errMsg = 'Whoops! Something went wrong. Please try again later.'

          logger.error('Error registering user with social account', err)
        }
        vm.isSocialRegistration = false
      })
    }

    vm.$stateParams = $stateParams
  }
})()
