(function() {
  'use strict';
  angular.module('tcUIComponents').directive('skillTile', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/skill-tile/skill-tile.directive.html',
      scope: {
        skill: '=',
        enableHide: "="
      },
      controller: ['$scope', 'ProfileService', 'UserService', function($scope, ProfileService, UserService) {

        $scope.toggle = function() {
          var skillTagId = $scope.skill.tagId;
          var handle = UserService.getUserIdentity().handle;
          if ($scope.skill.hidden) {
            // un-hide skill
            ProfileService.addUserSkill(handle, skillTagId).then(function(_skills) {
              $scope.skill.hidden = false;
            });
          } else {
            // hide skill
            ProfileService.hideUserSkill(handle, skillTagId).then(function(_skills) {
              $scope.skill.hidden = true;
            });
          }
        };

      }]
    };
  });
})();
