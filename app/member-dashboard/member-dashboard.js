/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 * @author mdesiderio
 * @version 1.0
 *
 * Controller for my dashboard page
 */
(function () {

  /**
   * Create my dashboard controller
   */
  angular
    .module('tc.myDashboard')
    .controller('dashboard', MyDashboardCtrl);

  /**
   * Inject dependencies
   * @type {string[]}
   */
  MyDashboardCtrl.$inject = ['$scope', '$location', 'tcAuth', 'profile'];

  /**
   * Controller implementation
   *
   * @param $scope
   * @constructor
   */
  function MyDashboardCtrl($scope, $location, tcAuth, profile) {
    var vm = this;
    vm.title = "My Dashboard";
    vm.identityListeners = {};
    vm.loggedIn = tcAuth.isAuthenticated();
    vm.addIdentityChangeListener = addIdentityChangeListener;
    vm.removeIdentityChangeListener = removeIdentityChangeListener;
    vm.activate = activate;

    // activate controller
    if (tcAuth.isAuthenticated() === true) {
      activate();
    } else { // if user is not logged in, return (to avoid extra ajax calls)
      return false;
    }

    function activate() {
      profile.getUserProfile().then(function(response) {
        for (var name in vm.identityListeners) {
          var listener = vm.identityListeners[name];
          if (typeof listener == 'function') {
            listener.call(vm, response.data);
          }
        };
        var highestRating, i, len, rating, ref;
        vm.profile = response.data;
        vm.handleColor = 'color: #000000';
        highestRating = 0;
        ref = response.data.ratingSummary;
        for (i = 0, len = ref.length; i < len; i++) {
          rating = ref[i];
          if (rating.rating > highestRating) {
            highestRating = rating.rating;
            vm.handleColor = rating.colorStyle;
          }
        }
        if (vm.profile.photoLink === '') {
          return vm.profile.photoLink = '//community.topcoder.com/i/m/nophoto_login.gif';
        } else {
          return vm.profile.photoLink = '//community.topcoder.com' + vm.profile.photoLink;
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