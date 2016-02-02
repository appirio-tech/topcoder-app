import angular from 'angular'

(function() {
  'use strict'

  var dependencies = [
    'angular-jwt',
    'ui.router',
    'ngCookies',
    'tc.services',
    'tcUIComponents',
    'angularSlideables',
    'ngDialog'
  ]

  angular.module('tc.profile', dependencies)

})()
