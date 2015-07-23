var glooo;
(function () {

  angular
    .module('tc.profile')
    .controller('ProfileAboutController', ProfileAboutController);

  ProfileAboutController.$inject = ['$scope', 'ProfileService'];

  function ProfileAboutController($scope, ProfileService) {
    var vm = this;
    vm.profile = {};
    glooo = vm;

    activate();

    function activate() {
      vm.profile = ProfileService.getMemberProfile();
      //$scope.initProfile(vm);
    }

  }


})();
