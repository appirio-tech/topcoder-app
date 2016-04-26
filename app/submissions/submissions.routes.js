import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tc.submissions').config([
    '$stateProvider',
    routes
  ])

  function routes($stateProvider) {
    var states = {
      submissions: {
        parent: 'root',
        abstract: true,
        url: '/challenges/:challengeId/submit/',
        template: require('./submissions')(),
        controller: 'SubmissionsController',
        controllerAs: 'submissions',
        data: {
          authRequired: false,
          title: 'Challenge Submission'
        },
        resolve: {
          challengeToSubmitTo: ['ChallengeService', '$stateParams', 'UserService', 'logger', ChallengeToSubmitTo]
        }
      },
      'submissions.file-design': {
        url: 'file/',
        template: require('./submit-design-files/submit-design-files')(),
        controller: 'SubmitDesignFilesController',
        controllerAs: 'vm'
      },
      'submissions.file-develop': {
        url: 'file/',
        template: require('./submit-develop-files/submit-develop-files')(),
        controller: 'SubmitDevelopFilesController',
        controllerAs: 'vm'
      }
    }

    function ChallengeToSubmitTo(ChallengeService, $stateParams, UserService, logger) {
      return {
        challenge: {
          name: 'Mock Challenge',
          id: 30049542,
          track: 'DESIGN'
        }
      }
    }

    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
