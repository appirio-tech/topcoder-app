(function() {
  'use strict';
  angular.module('tcUIComponents').directive('profileWidget', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/profile-widget/profile-widget.html',
      scope: {
        profile: '=profile',
        editProfileLink: '=editProfileLink'
      },
      link: function($scope, elem, attrs, ctrl) {
        if (_.isUndefined($scope.editProfileLink)) {
          $scope.editProfileLink = false;
        }
      }
    };
  });
})();
