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
        url: '/challenges/:challengeId/submit/?method=file',
        templateUrl: 'submissions/submissions.html',
        controller: 'SubmissionsController',
        controllerAs: 'submissions',
        data: {
          authRequired: true
        }
      }
    };

    for (var name in states) {
      var state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
