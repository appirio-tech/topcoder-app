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
        url: '/challenges/:challengeId/submit/',
        templateUrl: 'submissions/submissions.html',
        controller: 'SubmissionsController',
        controllerAs: 'submissions',
        data: {
          authRequired: true,

          // TODO: Get title from PMs
          title: 'Submit'
        },
        resolve: {
          challengeToSubmitTo: ['ChallengeService', '$stateParams', 'UserService', function(ChallengeService, $stateParams, UserService) {
            // This page is only available to users that are registered to the challenge (submitter role) and the challenge is in the Checkpoint Submission or Submission phase.
            var params = {
              filter: 'id=' + $stateParams.challengeId
            };

            var userHandle = UserService.getUserIdentity().handle;

            return ChallengeService.getUserChallenges(userHandle, params)
              .then(function(challenge) {
                challenge = challenge[0];

                if (!challenge) {
                  // There should be a challenge, redirect?
                  alert('User is not associated with this challenge.');
                }

                var phaseType;
                var phaseId;

                var isPhaseSubmission = _.some(challenge.currentPhases, function(phase) {
                  if (phase.phaseStatus === 'Open' && phase.phaseType === 'Submission') {
                    phaseType = 'Submission';
                    phaseId = phase.id;
                    return true;
                  }

                  return false;
                });

                var isSubmitter = _.some(challenge.userDetails.roles, function(role) {
                  return role === 'Submitter';
                });

                if (!isPhaseSubmission || !isSubmitter) {
                // TODO: Where do we redirect if you can't submit?
                  alert('You should not have access to this page');
                }

                return {
                  challenge: challenge,
                  phaseType: phaseType,
                  phaseId: phaseId
                };
              })
              .catch(function(err) {
                console.log('ERROR GETTING CHALLENGE: ', err);
                alert('There was an error accessing this page');
                // TODO: Where do we redirect if there is an error?
              });
          }]
        }
      },
      'submissions.file': {
        url: '?method=file',
        templateUrl: 'submissions/submit-file/submit-file.html',
        controller: 'SubmitFileController',
        controllerAs: 'vm',
      }
    };

    for (var name in states) {
      var state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
