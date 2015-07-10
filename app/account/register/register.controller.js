(function() {
  'use strict';

  angular.module('tc.account').controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$log', 'tcAuth', '$state'];

  function RegisterController($log, tcAuth, $state) {
    var vm = this;

    vm.register = function() {
      var userInfo = {
        param: {
          handle: vm.username,
          firstName: vm.firstname,
          lastName: vm.lastname,
          email: vm.email,
          country: {
            name: vm.country
          },
          credential: {
            password: vm.password
          },
          utmSource: '',
          utmMedium: '',
          utmCampaign: ''
        }
      };

      tcAuth.register(userInfo)
      .then(function(data) {
        $log.debug('registered successfully');

        // In the future, go to dashboard
        $state.go('registeredSuccessfully');
      })
      .catch(function(err) {
        $log.error('Error in registering new user: ', err);
      });
    };

  }
})();
