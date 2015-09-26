(function() {
  'use strict';

  angular.module('tc.account').controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$log', 'CONSTANTS', '$state', '$stateParams', 'TcAuthService', 'UserService', 'ISO3166', 'Helpers'];

  function RegisterController($log, CONSTANTS, $state, $stateParams, TcAuthService, UserService, ISO3166, Helpers) {
    $log = $log.getInstance("RegisterController");
    $log.debug("-init");
    var vm = this;


    // Set default for toggle password directive
    vm.defaultPlaceholder = 'Create Password';
    vm.busyMessage = CONSTANTS.BUSY_PROGRESS_MESSAGE;

    // lookup users country
    Helpers.getCountyObjFromIP()
      .then(function(obj) {
        vm.countryObj = obj;
      });

    vm.countries = ISO3166.getAllCountryObjects();

    vm.updateCountry = function (angucompleteCountryObj) {
      var countryCode = _.get(angucompleteCountryObj, 'originalObject.code', undefined);

      var isValidCountry = _.isUndefined(countryCode) ? false : true;
      vm.country = countryCode;
      vm.registerForm.country.$setValidity('required', isValidCountry);
    };

    vm.register = function() {
      var userInfo = {
        handle: vm.username,
        firstName: vm.firstname,
        lastName: vm.lastname,
        email: vm.email,
        country: {
          code: vm.country
        },
        utmSource: '',
        utmMedium: '',
        utmCampaign: ''
      };

      if (!vm.isSocialRegistration) {
        userInfo.credential = { password: vm.password };
      } else {
        userInfo.profile = {
          userId: vm.socialUserId,
          name: vm.firstname + " " + vm.lastname,
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
          afterActivationURL: CONSTANTS.MAIN_URL + '/skillpicker/'
        }
      }

      $log.debug('attempting to register user');
      TcAuthService.register(body)
      .then(function(data) {
        $log.debug('registered successfully');

        // In the future, go to dashboard
        $state.go('registeredSuccessfully');
      })
      .catch(function(err) {
        $log.error('Error in registering new user: ', err);
      });
    };

    vm.socialRegister = function(provider) {
      TcAuthService.socialRegistration(provider, null)
      .then(function(socialData) {
        vm.socialUserId = socialData.socialUserId;
        vm.username = socialData.username;
        vm.firstname = socialData.firstname;
        vm.lastname = socialData.lastname;
        vm.email = socialData.email;
        vm.isSocialRegistration = true;
        vm.socialProfile = socialData.socialProfile;
        vm.socialProvider = socialData.socialProvider;
        vm.socialContext.accessToken = socialData.socialaccessToken;
      })
    .catch(function(result) {
        switch (result.status) {
          case "SOCIAL_PROFILE_ALREADY_EXISTS":
            vm.errMsg = "An account with that profile already exists. Please login to access your account.";
            break;
          default:
            vm.errMsg = "Whoops! Something went wrong. Please try again later.";
            break;
        }
        vm.isSocialRegistration = false;
      });

    }

    vm.$stateParams = $stateParams;
  }
})();
