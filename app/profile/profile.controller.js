(function () {

  angular
    .module('tc.profile')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope', 'TcAuthService', 'UserService', 'ProfileService', '$q', '$log', 'userHandle', 'profile'];

  function ProfileCtrl($scope, TcAuthService, UserService, ProfileService, $q, $log, userHandle, profile) {
    var vm = this;
    var vms = [vm];
    vm.title = "Profile";
    vm.message = "Message"
    vm.profile = {};
    $scope.initProfile = initProfile;
    vm.userHandle = userHandle;

    activate();

    function activate() {
      // show edit profile link if user is authenticated and is viewing their own profile
      if (TcAuthService.isAuthenticated() && UserService.getUserIdentity().username == vm.userHandle) {
        vm.showEditProfileLink = true;
      } else {
        vm.showEditProfileLink = false;
      }
      var stats = ProfileService.getUserStats(vm.userHandle);
      var skills = ProfileService.getUserSkills(vm.userHandle);
      $q.all([stats, skills]).then(function(data) {
        stats = data[0];
        skills = data[1];
        vms = vms.forEach(function(vm) {
          vm.profile = profile;
          vm.tenure = moment().isoWeekYear() - moment(profile.createdAt).isoWeekYear();
          vm.stats = stats;
          vm.profile.tracks = vm.profile.tracks || ProfileService.getTracks(vm.stats) || [];
          vm.numProjects = ProfileService.getNumProjects(vm.stats);
          vm.numWins = ProfileService.getNumWins(vm.stats);
          if (vm.deferred) {
            vm.deferred.resolve(vm);
          }
          // slicing is temporary,
          // until horizontal scroll is implemented
          vm.skills = skills.skills.slice(0,6);
          vm.categories = ProfileService.getRanks(vm.stats).slice(0,4);
        });
      });
    }

    function initProfile(vm) {
      vms.push(vm);
    }

  }


})();
