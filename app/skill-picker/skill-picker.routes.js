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
        templateUrl: 'skill-picker/skill-picker.html',
        controller: 'SkillPickerController',
        controllerAs: 'vm',
        data: {
          authRequired: true,
          UIRefresh: true,
          title: 'Skill Picker'
        }
      }
    };

    for (var name in states) {
      var state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
