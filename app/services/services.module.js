(function() {
  'use strict';

  var dependencies = [
    'CONSTANTS',
    'ngCookies',
    'angular-storage',
    'angular-jwt',
    'restangular',
    'ngIsoConstants.services'
  ];

  angular.module('tc.services', dependencies);

})();
