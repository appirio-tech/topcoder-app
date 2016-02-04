import angular from 'angular'

(function() {
  'use strict'

  var dependencies = [
    'ui.router',
    'tc.services',
    'tcUIComponents',
    'toaster',
    'appirio-tech-ng-ui-components'
  ]

  angular.module('tc.submissions', dependencies)

})()
