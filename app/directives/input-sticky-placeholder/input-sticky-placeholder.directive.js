(function() {
  'use strict';

  angular.module('tcUIComponents').directive('inputStickyPlaceholder', inputStickyPlaceholder);

  /*
   *  ****** Make sure to style the input tag so that the text entered does
   *  not overlap with the sticky-placeholder ******
   *
   *  Example:
   *  input(input-sticky-placeholder, sticky-placeholder="First",
   *  placeholder="First Name")
   *
   */

  function inputStickyPlaceholder() {
    return {
      restrict: 'A',
      transclude: true,
      replace: true,
      templateUrl: 'directives/input-sticky-placeholder/input-sticky-placeholder.html',
      link: function(scope, element, attrs) {
        scope.stickyPlaceholder = attrs.stickyPlaceholder;
      }
    };
  }
})();
