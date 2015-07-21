(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('DashboardController', MyDashboardController);

  MyDashboardController.$inject = ['$location', 'TcAuthService', 'ProfileService'];

  function MyDashboardController($location, TcAuthService, ProfileService) {
    var vm = this;
    vm.title = "My Dashboard";
    vm.identityListeners = {};
    vm.loggedIn = TcAuthService.isAuthenticated();
    vm.addIdentityChangeListener = addIdentityChangeListener;
    vm.removeIdentityChangeListener = removeIdentityChangeListener;
    vm.activate = activate;
    vm.loggedInUser = null;

    // activate controller
    if (TcAuthService.isAuthenticated() === true) {
      activate();
    } else { // if user is not logged in, return (to avoid extra ajax calls)
      return false;
    }

    function activate() {
      ProfileService.getUserProfile().then(function(profileRes) {
        vm.loggedInUser = profileRes.result.content;
        vm.profile = vm.loggedInUser;

        for (var name in vm.identityListeners) {
          var listener = vm.identityListeners[name];
          if (typeof listener == 'function') {
            listener.call(vm, profileRes.data);
          }
        };
        
        if (vm.profile.photo.photoUrl === '') {
          return vm.profile.photoLink = '//community.topcoder.com/i/m/nophoto_login.gif';
        } else {
          return vm.profile.photoLink = '//community.topcoder.com' + vm.profile.photo.photoUrl;
        }
      });
      ProfileService.getUserStats().then(function(response) {
        var stats = response.result.content;
        var highestRating, i, len, rating, ref;

        vm.handleColor = 'color: #000000';
        highestRating = 0;
        ref = stats.developStats.rankStats;
        for (i = 0, len = ref.length; i < len; i++) {
          rating = ref[i];
          if (rating.rating > highestRating) {
            highestRating = rating.rating;
            vm.handleColor = rating.colorStyle ? rating.colorStyle : '';
          }
        }
      });
    }

    /**
     * Adds the provided listener for identity change event. If listener already exists, it does not update it.
     * Caller has to remove it first and then add new one in such cases.
     *
     * @param name String name of the listener, it is used to uniquely identify a listener
     * @param listener function callback to be called when identity change happens
     */
    function addIdentityChangeListener(name, listener) {
      if (!vm.identityListeners[name]) {
        vm.identityListeners[name] = listener;
      }
    }

    /**
     * Removes the listener, identified by given name, for identity change event.
     *
     * @param name String name of the listener, it is used to uniquely identify a listener
     */
    function removeIdentityChangeListener(name) {
      if (vm.identityListeners[name]) {
        delete vm.identityListeners[name];
      }
    }

    }


})();
