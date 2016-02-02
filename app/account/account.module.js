import angular from 'angular'

(function() {
  'use strict'

  var dependencies = [
    'ui.router',
    'tc.services',
    'ngIsoConstants',
    'angucomplete-alt',
    'ngBusy',
    'blocks.logger'
  ]

  angular.module('tc.account', dependencies)
  .config(['$provide',function ($provide) {
    $provide.decorator('$log', ['$delegate', 'LogEnhancer', function ($delegate, LogEnhancer) {
      LogEnhancer.enhanceLogger($delegate)
      return $delegate
    }])
  }])
})()
