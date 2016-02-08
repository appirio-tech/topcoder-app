import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents', ['dcbImgFallback', 'blocks.logger', 'toaster'])
  .config(['$provide',function ($provide) {
    $provide.decorator('$log', ['$delegate', 'LogEnhancer', function ($delegate, LogEnhancer) {
      LogEnhancer.enhanceLogger($delegate)
      return $delegate
    }])
  }])
})()
