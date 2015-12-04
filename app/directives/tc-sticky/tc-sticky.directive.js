
(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcSticky', ['CONSTANTS', '$window', tcSticky]);

  function tcSticky(CONSTANTS, $window) {
    return {
      restrict: 'A',
      link: function(scope, element) {
          scope.width = element.prop('offsetWidth');
          var elWidth = scope.width + 'px',
              elChild = angular.element(element[0].querySelector(':first-child'));
          var hitBottom = false;
          angular.element($window).bind("scroll", function() {
            var affixElement = document.getElementById('affix');
            var affixElementRect = affixElement.getBoundingClientRect();
            var elChildRect = elChild[0].getBoundingClientRect();
            if (affixElementRect.top >= 0 || $window.innerHeight <= elChildRect.height || $window.innerWidth < 768) {
                elChild.removeClass('affix affix-bottom');
            } else if ( affixElementRect.top < 0) {
              var bodyRect = document.body.getBoundingClientRect();
              var elChildAbsOffset = elChildRect.top - bodyRect.top;

              var affixElementRect = affixElement.getBoundingClientRect();
              var affixElementAbsOffset = affixElementRect.top - bodyRect.top;

              var elChildOffset = elChildAbsOffset - affixElementAbsOffset;
              var elChildHeight = elChild[0].clientHeight;
              var affixElementHeight = affixElement.clientHeight;

              var pastBottom = elChildOffset + elChildHeight > affixElementHeight;
              var topCovered = elChildRect.top > 10;

              elChild.addClass('affix');

              if (pastBottom && !hitBottom) {
                hitBottom = true;
                elChild.addClass('affix-bottom');
                elChild.removeClass('affix');
              }

              if (topCovered) {
                hitBottom = false;
                elChild.removeClass('affix-bottom');
                elChild.addClass('affix');
              }
            }
          });
          // remove the event listener before destroying the directive
          scope.$on('$destroy',function() {
            angular.element($window).unbind("scroll");
          });
      }
    };
  }
})();
