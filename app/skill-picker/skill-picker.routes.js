(function() {
  'use strict';

  angular.module('tc.skill-picker').config([
    '$stateProvider',
    routes
  ]);

  function routes($stateProvider) {
    var states = {
      'skillPicker': {
        parent: 'root',
        url: '/skill-picker/',
        data: {
          authRequired: true,
          title: 'Skill Picker'
        },
        resolve: {
          userIdentity: ['UserService', function(UserService) {
            return UserService.getUserIdentity();
          }],
          userProfile: ['userIdentity', 'ProfileService', function(userIdentity, ProfileService) {
            return ProfileService.getUserProfile(userIdentity.handle.toLowerCase());
          }],
          featuredSkills: ['TagsService', function(TagsService) {
            return TagsService.getApprovedSkillTags().then(function(res) {
              return _.filter(res, function(s) { return s.priority > 0});
            });
          }]
        },
        views: {
          'header@': {
            templateUrl: 'layout/header/account-header.html'
          },
          'container@': {
            templateUrl: 'skill-picker/skill-picker.html',
            controller: 'SkillPickerController',
            controllerAs: 'vm'
          },
          'footer@': {
            // no footer
            template: ''
          }
        }
      }
    };

    for (var name in states) {
      var state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
