import angular from 'angular'

(function() {
  'use strict'

  var dependencies = [
    'angular-jwt',
    'ui.router',
    'restangular',
    'ngCookies',
    'angularSlideables',
    'tcUIComponents',
    'topcoder',
    'dcbImgFallback',
    'angular.filter'
  ]

  angular.module('tc.myChallenges', dependencies)
})()
