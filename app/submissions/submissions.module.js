import angular from 'angular'

(function() {
  'use strict'

  var dependencies = [
    'ui.router',
    'tc.services',
    'tcUIComponents',
    'toaster',
    'appirio-tech-ng-ui-components',
    'angular-filepicker'
  ]

  angular.module('tc.submissions', dependencies)
  .config(['filepickerProvider', 'CONSTANTS',
    function (filepickerProvider, CONSTANTS) {
      //CONSTANTS.FILE_PICKER_API_KEY
      filepickerProvider.setKey("AzFINuQoqTmqw0QEoaw9az")
    }
  ])

})()
