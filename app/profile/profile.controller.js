(function () {

  angular
    .module('tc.profile')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['profile'];

  function ProfileCtrl(profile) {
    var vm = this;
    vm.title = "Profile";
    vm.message = "Message"
    vm.profile = {};

    activate();

    function activate() {
      vm.profile = profile.getMemberProfile();
      vm.memberFor = moment().year() - moment(profile.createdAt).year() + '';
    }


  }


})();
