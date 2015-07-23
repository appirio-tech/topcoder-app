(function () {

  angular
    .module('tc.profile')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope', 'ProfileService'];

  function ProfileCtrl($scope, ProfileService) {
    var vm = this;
    var vms = [vm];
    vm.title = "Profile";
    vm.message = "Message"
    vm.profile = {};
    $scope.initProfile = initProfile;

    activate();

    function activate() {
      vm.profile = ProfileService.getMemberProfile();
      vm.memberFor = moment().year() - moment(vm.profile.createdAt).year() + '';
      ProfileService.getUserProfile().then(function(profile) {
        vms = vms.forEach(function(vm) {
          vm.profile = profile.result.content;
          console.log(vm.profile);
        });
      });
    }

    function initProfile(vm) {
      vms.push(vm);
    }

  }


})();
