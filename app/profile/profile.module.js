(function() {
  'use strict';

  var dependencies = [
    'angular-jwt',
    'ui.router',
    'ngCookies',
    'tc.services',
    'angularSlideables'
  ];

  angular
    .module('tc.profile', dependencies);

})();
