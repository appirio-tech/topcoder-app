(function () {

  angular
    .module('tc.profile')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['ProfileService'];

  function ProfileCtrl(ProfileService) {
    var vm = this;
    vm.title = "Profile";
    vm.message = "Message"
    vm.profile = {};

    activate();

    function activate() {
      vm.profile = ProfileService.getMemberProfile();
      vm.memberFor = moment().year() - moment(vm.profile.createdAt).year() + '';
    }


  }


})();
