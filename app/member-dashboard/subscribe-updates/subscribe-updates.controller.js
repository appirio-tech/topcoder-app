(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('SubscribeUpdatesController', SubscribeUpdatesController);

  SubscribeUpdatesController.$inject = ['$scope', '$http', '$location', 'TcAuthService'];

  function SubscribeUpdatesController($scope, $http, $location, TcAuthService) {
    var vm = this;
    vm.title = "Subscribe to Updates";
    vm.loggedIn = TcAuthService.isAuthenticated();
    vm.frm = {};
    vm.email = null;
    // as of now not able to bind the url to view, so it is hard coded in view too
    vm.feedBlitzUrl = 'https://www.feedblitz.com/f/f.fbz?AddNewUserDirect';
    vm.feedBlitzFormName = 'FeedBlitz_0fd529537e2d11e392f6002590771251';
    vm.feedBlitzPublisher = 34610190;
    vm.feedBlitzFeedId = 926643;
    vm.subscribe = subscribe;

    activate();

    function activate() {
      // nothing to do yet
    }

    function subscribe() {
      vm.frm = {};
      if (!vm.email || vm.email.trim().length === 0) {
        vm.frm.email = {error : true};
        $scope.$apply();
        return false;
      }
      $scope.$apply();
      return true;
    }

  }


})();
