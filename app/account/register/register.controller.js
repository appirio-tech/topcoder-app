(function() {
  'use strict';

  angular.module('tc.account').controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$log', 'tcAuth'];

  function RegisterController($log, tcAuth) {
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
        // Go to dashboard
      })
      .catch(function(err) {
        $log.error('Error in registering new user: ', err);
      });
    };

  }
})();
