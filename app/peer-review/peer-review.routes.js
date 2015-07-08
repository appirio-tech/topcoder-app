(function() {
  'use strict';

  angular.module('tc.peer-review').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider, $httpProvider) {
    var states = {
      review: {
        abstract: true,
        parent: 'root',
        template: '<div ui-view></div>',
        data: {
          authRequired: true,
        }
      },
      'review.status': {
        parent: 'review',
        url: '/challenge/:challengeId',
        templateUrl: 'peer-review/review-status/review-status.html',
        controller: 'ReviewStatusController',
        controllerAs: 'vm',
        data: {
          title: 'Peer Review'
        }
      },
      'review.readOnlyScorecard': {
        parent: 'review',
        url: '/scorecard/:scorecardId',
        templateUrl: 'peer-review/readOnlyScorecard/readOnlyScorecard.html',
        controller: 'ReadOnlyScorecardController',
        controllerAs: 'vm'
      },
      'review.completed': {
        parent: 'review',
        url: '/:challengeId/reviews/:reviewId/completed',
        templateUrl: 'peer-review/completed-review/completed-review.html',
        controller: 'CompletedReviewController',
        controllerAs: 'vm'
      },
      'review.edit': {
        parent: 'review',
        url: '/:challengeId/reviews/:reviewId/edit',
        templateUrl: 'peer-review/edit-review/edit-review.html',
        controller: 'EditReviewController',
        controllerAs: 'vm'
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  };
})();
