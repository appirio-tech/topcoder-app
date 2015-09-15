(function() {
  'use strict';

  angular.module('tcUIComponents').directive('profileWidget', ['CONSTANTS', profileWidget]);

  function profileWidget(CONSTANTS) {
    return {
      restrict: 'E',
      templateUrl: 'directives/profile-widget/profile-widget.html',
      scope: {
        profile: '=profile',
        editProfileLink: '=editProfileLink',
        numChallenges: '=numChallenges'
      },
      link: function(scope, elem, attrs) {
        scope.DOMAIN = CONSTANTS.domain;

        scope.$watch('editProfileLink', function(newValue, oldValue, scope) {
          if (newValue) {
            scope.editProfileLink = newValue;
          }
        });
      }
    };
  }
})();
