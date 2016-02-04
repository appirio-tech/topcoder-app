import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('skillTile', function() {
    return {
      restrict: 'E',
      template: require('./skill-tile')(),
      scope: {
        skill: '=',
        enableHide: '='
      },
      controller: ['$scope', 'ProfileService', 'UserService', 'CONSTANTS', function($scope, ProfileService, UserService, CONSTANTS) {
        $scope.skill.category = _.get($scope.skill, 'categories[0]', 'DEVELOP')
        $scope.ASSET_PREFIX = CONSTANTS.ASSET_PREFIX

        $scope.toggle = function() {
          var skillTagId = $scope.skill.tagId
          var handle = UserService.getUserIdentity().handle
          if ($scope.skill.hidden) {
            // un-hide skill
            ProfileService.addUserSkill(handle, skillTagId).then(function(_skills) {
              $scope.skill.hidden = false
            })
          } else {
            // hide skill
            ProfileService.hideUserSkill(handle, skillTagId).then(function(_skills) {
              $scope.skill.hidden = true
            })
          }
        }

      }]
    }
  })
})()
