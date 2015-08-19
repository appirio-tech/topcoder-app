(function() {
  'use strict';

  angular.module('tcUIComponents').directive('profileWidget', ['CONSTANTS', profileWidget]);

  function profileWidget(CONSTANTS) {
    return {
      restrict: 'E',
      templateUrl: 'directives/profile-widget/profile-widget.html',
      scope: {
        profile: '=profile',
        editProfileLink: '=editProfileLink'
      },
      link: function($scope, elem, attrs, ctrl) {
        $scope.DOMAIN = CONSTANTS.domain;

        if (_.isUndefined($scope.editProfileLink)) {
          $scope.editProfileLink = false;
        }
      }
    };
  }
})();
