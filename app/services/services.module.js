(function() {
  'use strict';

  var dependencies = [
    'CONSTANTS',
    'ngCookies',
    'angular-storage',
    'angular-jwt',
    'restangular',
    'ngIsoConstants.services',
    'blocks.logger'
  ];

  angular.module('tc.services', dependencies)
  .config(['$provide',function ($provide) {
    $provide.decorator('$log', ['$delegate', 'LogEnhancer', function ($delegate, LogEnhancer) {
      LogEnhancer.enhanceLogger($delegate);
      return $delegate;
    }]);
  }]);

})();
