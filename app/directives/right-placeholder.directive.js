(function() {
  'use strict';

  angular.module('tcUIComponents').directive('rightPlaceholder', rightPlaceholder);

  function rightPlaceholder() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var unfocusedPlaceholder = attrs.placeholder;

        element.bind('focus', function() {
          element.attr('placeholder', attrs.focusedPlaceholder);
          element.addClass('focused-placeholder');
        });

        element.bind('blur', function() {
          element.attr('placeholder', unfocusedPlaceholder);
          element.removeClass('focused-placeholder');
        });
      }
    };
  }
})();
