(function() {
  'use strict';

  angular.module('tc.account').controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$log', 'CONSTANTS', '$state', '$stateParams', 'TcAuthService', 'UserService'];

  function RegisterController($log, CONSTANTS, $state, $stateParams, TcAuthService, UserService) {
    var vm = this;


    // Social Registeration callback
    var params = {}, callbackUrl;
    if ($stateParams.next) {
      params = {next: $stateParams.next};
    }
    callbackUrl = $state.href('register', params, {absolute: true});
    var auth0Register = new Auth0({
      domain: CONSTANTS.auth0Domain,
      clientID: CONSTANTS.clientId,
      // callbackOnLocationHash: true,
      callbackURL: callbackUrl
    });
    vm.socialProvider = null;
    vm.socialUserId = null;
    vm.socialProfile = null;
    if (window.location.hash) {
      auth0Register.getProfile(window.location.hash, function(err, profile, id_token, access_token, state) {
        if (!err) {
          // hide password field
          vm.socialRegister = true;
          vm.socialProfile = profile;

          // pre-populate data
          vm.socialProvider = profile.identities[0].connection;
          var firstName = "" , lastName = "", handle = "", email = "", socialProviderId='';
          if(vm.socialProvider === 'google-oauth2') {
            firstName = profile.given_name;
            lastName = profile.family_name;
            handle = profile.nickname;
            email = profile.email;
            socialProviderId = 2;
          } else if (vm.socialProvider === 'facebook') {
            firstName = profile.given_name;
            lastName = profile.family_name;
            handle = firstName + '.' + lastName;
            email = profile.email;
            socialProviderId = 1;
          } else if (vm.socialProvider === 'twitter') {
            var splitName = profile.name.split(" ");
            firstName = splitName[0];
            if (splitName.length > 1) {
              lastName = splitName[1];
            }
            handle = profile.screen_name;
            socialProviderId = 3;
          } else if (vm.socialProvider === 'github') {
            var splitName = profile.name.split(" ");
            firstName = splitName[0];
            if (splitName.length > 1) {
              lastName = splitName[1];
            }
            handle = profile.nickname;
            email = profile.email;
            socialProviderId = 4;
          }
          vm.socialUserId = profile.user_id.substring(profile.user_id.indexOf('|')+1);
          // validate social profile
          UserService.validateSocialProfile(vm.socialUserId, socialProviderId).then(
            function (data) {
              // success
              vm.username = handle;
              vm.firstname = firstName;
              vm.lastname = lastName;
              vm.email = email;

            }, function (resp) {
              $log.error('Socail handle exist');
              // TODO - display message to user
              vm.errMsg = "An account with that profile already exists. Please login to access your account.";
              vm.socialRegister = false;
            }
          )
        } else {
          $log.error(err);
          // reset form?
          vm.socialRegister = false;
        }
      });
    }

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

      if (!vm.socialRegister) {
        userInfo.credential = { password: vm.password };
      } else {
        userInfo.profile = {
          userId: vm.socialUserId,
          name: vm.firstname + " " + vm.lastname,
          email: vm.socialProfile.email,
          emailVerified: vm.socialProfile.emailVerified,
          providerType: vm.socialProvider
        }
      }

      TcAuthService.register({param: userInfo})
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
          response_type: 'token'
        });
    }
  }
})();
