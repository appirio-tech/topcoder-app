(function() {
  'use strict';

  angular.module('tc.profile').config([
    '$stateProvider',
    '$urlRouterProvider',
    routes
  ]).run(['$rootScope', '$state', function($rootScope, $state) {
    // handle state change error
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if (toState.name.indexOf('profile') > -1 && error.status === 400) {
        // unable to find a member with that username
        $state.go('404');
      }
    });
  }]);

  function routes($stateProvider, $stateParams, $urlRouterProvider) {
    var name, state, states;
    states = {
      'profile': {
        parent: 'root',
        abstract: true,
        url: '/members/:userHandle/',
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl as profileVm',
        resolve: {
          userHandle: ['$stateParams', function($stateParams) {
            return $stateParams.userHandle;
          }],
          profile: ['userHandle', 'ProfileService', function(userHandle, ProfileService) {
            return ProfileService.getUserProfile(userHandle);
          }]
        },
        data: {
          authRequired: false,
          title: "{{userHandle}} Profile"
        }
      },
      'profile.about': {
        url: '',
        templateUrl: 'profile/about/about.html',
        controller: 'ProfileAboutController',
        controllerAs: 'vm'
      },
      'profile.subtrack': {
        url: 'details/?:track&:subTrack',
        templateUrl: 'profile/subtrack/subtrack.html',
        controller: 'ProfileSubtrackController',
        controllerAs: 'vm'
      },
      'profileBadges': {
        url: '/members/:userHandle/badges/',
        templateUrl: 'profile/badges/badges.html',
        parent: 'root',
        controller: 'BadgesController',
        controllerAs: 'vm'
      }
    };
    for (name in states) {
      state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
