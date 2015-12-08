(function() {
  'use strict';

  angular.module('tc.submissions').config([
    '$stateProvider',
    '$locationProvider',
    routes
  ]);

  function routes($stateProvider, $locationProvider) {

    // Commenting this out to see if it is necessary
    // $locationProvider.html5Mode(true);

    var states = {
      submissions: {
        parent: 'root',
        abstract: false,
        url: '/submissions/',
        templateUrl: 'submissions/submissions.html',
        controller: 'SubmissionsController',
        controllerAs: 'submissions',
        data: {

          // Is Auth required?
          authRequired: true
        },
        resolve: {

          // userHandle: ['UserService', function(UserService) {
          //   return UserService.getUserIdentity().handle;
          // }],
          // userData: ['userHandle', 'ProfileService', function(userHandle, ProfileService) {
          //   return ProfileService.getUserProfile(userHandle);
          // }]
        },
      },
      'submissions.design': {
        url: 'design/',
        templateUrl: 'submissions/design/design.html',
        controller: 'DesignSubmissionsController',
        controllerAs: 'vm',
        data: {
          title: 'Design Submissions'
        }
      }
    };

    for (var name in states) {
      var state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
