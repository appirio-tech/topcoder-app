(function() {
  'use strict';

  angular.module('tcUIComponents').directive('profileWidget', ['CONSTANTS', '$filter', profileWidget]);

  function profileWidget(CONSTANTS, $filter) {
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
        // get max rating or default to 0
        var rating = _.get(scope.profile, 'maxRating.rating', 0);
        scope.handleColor = $filter('ratingColor')(rating);
        scope.$watch('editProfileLink', function(newValue, oldValue, scope) {
          if (newValue) {
            scope.editProfileLink = newValue;
          }
        });
      }
    };
  }
})();
