(function() {
  'use strict';

  angular.module('tc.submissions').config([
    '$stateProvider',
    '$locationProvider',
    routes
  ]);

  function routes($stateProvider, $locationProvider) {
    var states = {
      submissions: {
        parent: 'root',
        abstract: true,
        templateUrl: 'submissions/submissions.html',
        controller: 'SubmissionsController',
        controllerAs: 'submissions',
        data: {
          authRequired: true,

          // TODO: Get title from PMs
          title: 'Submit'
        }
      },
      'submissions.file': {
        url: '/challenges/:challengeId/submit/?method=file',
        templateUrl: 'submissions/submit-file/submit-file.html',
        controller: 'SubmitFileController',
        controllerAs: 'vm'
      }
    };

    for (var name in states) {
      var state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
