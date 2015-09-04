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
        url: '/skillpicker/',
        data: {
          authRequired: true,
          UIRefresh: true,
          title: 'Skill Picker'
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
