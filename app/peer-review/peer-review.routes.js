import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.peer-review').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$locationProvider',
    routes
  ])

  function routes($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $locationProvider.html5Mode(true)
    var states = {
      review: {
        parent: 'root',
        abstract: true,
        data: {
          authRequired: true
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
            template: require('./review-status/review-status')(),
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
            template: require('./readOnlyScorecard/readOnlyScorecard')(),
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
            template: require('./completed-review/completed-review')(),
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
            template: require('./edit-review/edit-review')(),
            controller: 'EditReviewController',
            controllerAs: 'vm'
          }
        }
      }
    }

    angular.forEach(states, function(state, name) {
      $stateProvider.state(name, state)
    })
  }
})()
