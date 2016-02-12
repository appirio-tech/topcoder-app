import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('profileWidget', ['CONSTANTS', 'ProfileService', profileWidget])

  function profileWidget(CONSTANTS, ProfileService) {
    return {
      restrict: 'E',
      template: require('./profile-widget')(),
      scope: {
        profile: '=profile',
        editProfileLink: '=editProfileLink',
        numWins: '=numWins',
        profileVm: '=profileVm'
      },
      link: function(scope, elem, attrs) {
        scope.DOMAIN = CONSTANTS.domain
        scope.ASSET_PREFIX = CONSTANTS.ASSET_PREFIX

        scope.handleColor = ProfileService.getUserHandleColor(scope.profile)
        scope.$watch('editProfileLink', function(newValue, oldValue, scope) {
          if (newValue) {
            scope.editProfileLink = newValue
          }
        })
      }
    }
  }
})()
