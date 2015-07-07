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
      review: {
        abstract: true,
        parent: 'root',
        template: '<div ui-view></div>',
        data: {
          authRequired: true,
        }
      },
      'reviewStatus': {
        parent: 'review',
        url: '/challenge/:challengeId',
        templateUrl: 'peer-review/review-status/review-status.html',
        controller: 'ReviewStatusController',
        controllerAs: 'vm',
        data: {
          title: 'Peer Review'
        }
      },
      'readOnlyScorecard': {
        parent: 'review',
        url: '/scorecard/:scorecardId',
        templateUrl: 'peer-review/readOnlyScorecard/readOnlyScorecard.html',
        controller: 'ReadOnlyScorecardController'
      },
      'completed': {
        parent: 'review',
        url: '/:challengeId/reviews/:reviewId/completed',
        templateUrl: 'peer-review/completed-review/completed-review.html',
        controller: 'CompletedReviewController',
      },
      'edit': {
        parent: 'review',
        url: '/:challengeId/reviews/:reviewId/edit',
        templateUrl: 'peer-review/edit-review/edit-review.html',
        controller: 'EditReviewController',
      }
    };
    for (name in states) {
      state = states[name];
      $stateProvider.state(name, state);
    }
  };
})();
