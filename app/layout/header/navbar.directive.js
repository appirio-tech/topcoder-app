import angular from 'angular'
import { NavBar } from 'appirio-tech-react-components'


(function() {
  'use strict'

  angular.module('tc.layout').directive('navbar', navbar)

  navbar.$inject = ['reactDirective']

  function navbar(reactDirective) {
    return reactDirective(NavBar.default)
  }
})()
