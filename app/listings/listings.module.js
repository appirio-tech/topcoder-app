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

  class Foo extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return React.createElement('p', null, 'Foo')
    }
  }
  window.console.log('STUFFFFFF')
  window.console.log(Foo)
  window.console.log(ChallengeFiltersExample.default)

  angular.module('tc.listings', dependencies)
         .value('ChallengeFiltersExample', ChallengeFiltersExample.default)
         .value('Foo', Foo)

})()
