(function () {

  angular
    .module('tc.profile')
    .controller('ProfileAboutController', ProfileAboutController);

  ProfileAboutController.$inject = ['ProfileService'];

  function ProfileAboutController(ProfileService) {
    var vm = this;
    vm.profile = {};

    activate();

    function activate() {
      vm.profile = ProfileService.getMemberProfile();
    }

  }


})();
