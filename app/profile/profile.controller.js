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
    .module('tc.profile')
    .controller('ProfileCtrl', ProfileCtrl);

  /**
   * Inject dependencies
   * @type {string[]}
   */
  ProfileCtrl.$inject = ['profile'];

  /**
   * Controller implementation
   *
   * @param $scope
   * @constructor
   */
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
