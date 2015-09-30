(function() {
  'use strict';

  angular.module('tc.peer-review').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$locationProvider',
    routes
  ]);

  function routes($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    var states = {
      review: {
        parent: 'root',
        abstract: true,
        data: {
          authRequired: true,
        }
      },
      'review.status': {
        parent: 'review',
        url: '/challenge/:challengeId/',
        data: {
          title: 'Peer Review'
        },
        views: {
          'container@': {
            templateUrl: 'peer-review/review-status/review-status.html',
            controller: 'ReviewStatusController',
            controllerAs: 'vm'
          }
        }
      },
      'review.readOnlyScorecard': {
        parent: 'review',
        url: '/scorecard/:scorecardId/',
        data: {
          title: 'Scorecard'
        },
        views: {
          'container@': {
            templateUrl: 'peer-review/readOnlyScorecard/readOnlyScorecard.html',
            controller: 'ReadOnlyScorecardController',
            controllerAs: 'vm'
          }
        }
      },
      'review.completed': {
        parent: 'review',
        url: '/:challengeId/reviews/:reviewId/completed/',
        data: {
          title: 'Completed'
        },
        views: {
          'container@': {
            templateUrl: 'peer-review/completed-review/completed-review.html',
            controller: 'CompletedReviewController',
            controllerAs: 'vm'
          }
        }
      },
      'review.edit': {
        parent: 'review',
        url: '/:challengeId/reviews/:reviewId/edit/',
        data: {
          title: 'Edit Review'
        },
        views: {
          'container@': {
            templateUrl: 'peer-review/edit-review/edit-review.html',
            controller: 'EditReviewController',
            controllerAs: 'vm'
          }
        }
      }
    };

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state);
    });
  };
})();
