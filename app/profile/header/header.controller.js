var glo;
(function () {

  angular
    .module('tc.profile')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope', 'ProfileService'];

  function ProfileCtrl($scope, ProfileService) {
    var vm = glo = this;
    var vms = [vm];
    vm.title = "Profile";
    vm.message = "Message"
    vm.profile = {};
    vm.tracks = [];
    $scope.initProfile = initProfile;

    activate();

    function activate() {
      vm.profile = ProfileService.getMemberProfile();
      vm.memberFor = moment().year() - moment(vm.profile.createdAt).year() + '';
      ProfileService.getUserProfile().then(function(profile) {
        ProfileService.getUserStats().then(function(stats) {
          vms = vms.forEach(function(vm) {
            vm.profile = profile;
            vm.stats = stats;
          });
          vm.tracks = ProfileService.getTracks(vm.stats);
        });
      });
    }

    function initProfile(vm) {
      vms.push(vm);
    }

  }


})();
