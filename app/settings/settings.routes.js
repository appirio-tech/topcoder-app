import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.settings').config([
    '$stateProvider',
    routes
  ])

  function routes($stateProvider) {
    var states = {
      'settings': {
        parent: 'root',
        abstract: false,
        url: '/settings/',
        template: require('./settings')(),
        controller: 'SettingsController',
        controllerAs: 'settings',
        data: {
          authRequired: true
        },
        resolve: {
          userHandle: ['UserService', function(UserService) {
            return UserService.getUserIdentity().handle
          }],
          userData: ['userHandle', 'ProfileService', function(userHandle, ProfileService) {
            return ProfileService.getUserProfile(userHandle)
          }]
        }
      },
      'settings.profile': {
        url: 'profile/',
        template: require('./edit-profile/edit-profile')(),
        controller: 'EditProfileController',
        controllerAs: 'vm',
        data: {
          title: 'Edit Profile'
        }
      },
      'settings.account': {
        url: 'account/',
        template: require('./account-info/account-info')(),
        controller: 'AccountInfoController',
        controllerAs: 'vm',
        data: {
          title: 'Account Info'
        }
      },
      'settings.email': {
        url: 'email/',
        template: require('./email/email')(),
        controller: 'EmailSettingsController',
        controllerAs: 'vm',
        data: {
          title: 'Email Preferences'
        },
        resolve: {
          userIdentity: ['UserService', function(UserService) {
            return UserService.getUserIdentity()
          }],
          userProfile: ['userIdentity', 'ProfileService', function(userIdentity, ProfileService) {
            return ProfileService.getUserProfile(userIdentity.handle.toLowerCase())
          }]
        }
      },
      'settings.preferences': {
        url: 'preferences/',
        template: require('./preferences/preferences')(),
        data: {
          title: 'Preferences'
        }
      }
    }

    for (var name in states) {
      var state = states[name]
      $stateProvider.state(name, state)
    }
  }
})()
