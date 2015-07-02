/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 * @author mdesiderio
 * @version 1.0
 *
 * Controller for the marketing message widget
 */
(function () {

  /**
   * Create marketing message controller
   */
  angular
    .module('tc.myDashboard')
    .controller('MarketingMessageCtrl', MarketingMessageCtrl);

  /**
   * Inject dependencies
   * @type {string[]}
   */
  MarketingMessageCtrl.$inject = ['$scope', 'MARKETING_MESSAGE_URL', '$sce'];

  /**
   * Controller implementation
   *
   * @param $scope
   * @param MARKETING_MESSAGE_URL URL for marketing message banner iframe
   * @param $sce used to trust the marketing message url
   * @constructor
   */
  function MarketingMessageCtrl($scope, MARKETING_MESSAGE_URL, $sce) {
    var vm = this;
    vm.marketingMessageURL = "";

    // activate controller
    activate();

    function activate() {
      // set marketing message banner iframe url
      vm.marketingMessageURL = $sce.trustAsResourceUrl(MARKETING_MESSAGE_URL);
    }
  }


})();