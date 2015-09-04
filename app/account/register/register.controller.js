(function() {
  'use strict';

  angular.module('tc.account').controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$log', 'CONSTANTS', '$state', '$stateParams', 'TcAuthService', 'UserService', 'ISO3166', 'Helpers'];

  function RegisterController($log, CONSTANTS, $state, $stateParams, TcAuthService, UserService, ISO3166, Helpers) {
    var vm = this;

    // Set default for toggle password directive
    vm.defaultPlaceholder = 'Create Password';

    // Social Registeration callback
    var params = {}, callbackUrl;
    if ($stateParams.next) {
      params = {next: $stateParams.next};
    }
    callbackUrl = $state.href('register', params, {absolute: true});
    var auth0Register = new Auth0({
      domain: CONSTANTS.auth0Domain,
      clientID: CONSTANTS.clientId,
      callbackURL: callbackUrl
    });
    vm.socialProvider = null;
    vm.socialUserId = null;
    vm.socialProfile = null;
    if (window.location.hash) {
      TcAuthService.socialRegisterCallbackHandler(auth0Register, window.location.hash)
      .then(function(result) {
        vm.socialUserId = result.data.socialUserId;
        vm.username = result.data.username;
        vm.firstname = result.data.firstname;
        vm.lastname = result.data.lastname;
        vm.email = result.data.email;
        vm.isSocialRegistration = true;
        vm.socialProfile = result.data.socialProfile;
        vm.socialProvider = result.data.socialProvider;
      })
    .catch(function(result) {
        switch (result.status) {
          case "SOCIAL_PROFILE_ALREADY_EXISTS":
            vm.errMsg = "An account with that profile already exists. Please login to access your account.";
            break;
          case "INVALID_HASH":
          default:
            vm.errMsg = "Whoops! Something went wrong. Please try again later.";
            break;
        }
        vm.isSocialRegistration = false;
      });
    }

    // lookup users country
    Helpers.getCountyObjFromIP()
      .then(function(obj) {
        vm.countryObj = obj;
      });

    vm.countries = ISO3166.getAllCountryObjects();

    vm.updateCountry = function (angucompleteCountryObj) {
      var countryCode = _.get(angucompleteCountryObj, 'originalObject.alpha3', undefined);

      var isValidCountry = _.isUndefined(countryCode) ? false : true;
      vm.registerForm.country.$setValidity('required', isValidCountry);
    };

    vm.register = function() {
      var userInfo = {
        handle: vm.username,
        firstName: vm.firstname,
        lastName: vm.lastname,
        email: vm.email,
        country: {
          name: vm.country
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
          providerType: vm.socialProvider
        }
      }

      var body = {
        param: userInfo,
        options: {
          afterActivationURL: CONSTANTS.MAIN_URL + '/my-dashboard/'
        }
      }

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

    vm.socialRegister = function(backend) {
      auth0Register.login({
          scope: "openid profile offline_access",
          state: callbackUrl,
          connection: backend,
          response_type: 'token',
          callbackURL: callbackUrl
        });
    }

    vm.$stateParams = $stateParams;
  }
})();
