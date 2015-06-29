(function() {
  'use strict';

  angular.module('tc.peer-review').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider, $httpProvider) {
    var name, state, states;
    states = {
      reviewStatus: {
        url: '/challenge/:challengeId',
        templateUrl: 'peer-review/review-status/review-status.html',
        controller: 'ReviewStatusController as vm',
        authenticate: true
      },
      readOnlyScorecard: {
        url: '/scorecard/:scorecardId',
        templateUrl: 'peer-review/readOnlyScorecard/readOnlyScorecard.html',
        controller: 'ReadOnlyScorecardController'
      },
      completed: {
        url: '/:challengeId/reviews/:reviewId/completed',
        templateUrl: 'peer-review/completed-review/completed-review.html',
        controller: 'CompletedReviewController',
        authenticate: true
      },
      edit: {
        url: '/:challengeId/reviews/:reviewId/edit',
        templateUrl: 'peer-review/edit-review/edit-review.html',
        controller: 'EditReviewController',
        authenticate: true
      }
    };
    for (name in states) {
      state = states[name];
      $stateProvider.state(name, state);
    }
  };
})();
