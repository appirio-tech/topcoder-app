(function() {
  'use strict';

  angular.module('tc.sitemap').config([
    '$stateProvider',
    '$locationProvider',
    routes
  ]);

  function routes($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    var states = {
      'sitemap': {
        parent: 'root',
        abstract: false,
        url: '/sitemap/',
        templateUrl: 'sitemap/sitemap.html'
      }
    };

    for (var name in states) {
      var state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
