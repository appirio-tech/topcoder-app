import angular from 'angular'
import React from 'react'
import { ChallengeFiltersExample, TCFooter } from 'appirio-tech-react-components'

(function() {
  'use strict'

  var dependencies = [
    'angular-jwt',
    'ui.router',
    'ngCookies',
    'tc.services',
    'tcUIComponents',
    'angularSlideables',
    'ngDialog',
    'react'
  ]

  angular.module('tc.listings', dependencies)
         .value('ChallengeFiltersExample', ChallengeFiltersExample.default)

})()
