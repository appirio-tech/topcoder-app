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
        numWins: '=numWins',
        profileVm: '=profileVm'
      },
      link: function(scope, elem, attrs) {
        scope.DOMAIN = CONSTANTS.domain;
        scope.ASSET_PREFIX = CONSTANTS.ASSET_PREFIX;

        scope.$watch('editProfileLink', function(newValue, oldValue, scope) {
          if (newValue) {
            scope.editProfileLink = newValue;
          }
        });
      }
    };
  }
})();
