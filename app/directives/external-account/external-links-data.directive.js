(function() {
  'use strict';

  /**
   * @desc links data card directive
   * @example <external-links-data></external-links-data>
   */
  angular
    .module('tcUIComponents')
    .directive('externalLinksData', externalLinksData);

  function externalLinksData() {
    var directive = {
     restrict: 'E',
      templateUrl: 'directives/external-account/external-link-data.directive.html',
      scope: {
        linkedAccountsData: '=',
        editable: '='
      }
    };
    return directive;
  }
})();
