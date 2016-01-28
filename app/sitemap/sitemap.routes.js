import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.sitemap').config([
    '$stateProvider',
    routes
  ])

  function routes($stateProvider) {
    var states = {
      'sitemap': {
        parent: 'root',
        abstract: false,
        url: '/sitemap/',
        template: require('./sitemap')()
      }
    }

    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
