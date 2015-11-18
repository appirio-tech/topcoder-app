
(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcSticky', ['CONSTANTS', '$window', tcSticky]);

  function tcSticky(CONSTANTS, $window) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        scope.width = element.prop('offsetWidth');

        var elWidth = scope.width + 'px';
        var elChild = angular.element(element[0].querySelector(':first-child'));
        // elChild.css('width', elWidth);

        var hitBottom = false;

        angular.element($window).bind("scroll", function() {
          var affixElement = document.getElementById('affix');
          var xPosition = 0;
          var yPosition = 0;

          function getPosition(element) {
            while(element) {
              yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
              element = element.offsetParent;
            }
          }

          getPosition(affixElement);

          var height = angular.element(affixElement).prop('offsetHeight');
          var top = angular.element(affixElement).prop('offsetTop');

          if (yPosition >= 0 || $window.innerHeight <= elChild[0].offsetHeight || $window.innerWidth < 768) {
            elChild.removeClass('affix affix-bottom');
          } else if ( yPosition < 0) {
            var bodyRect = document.body.getBoundingClientRect()
            var elChildRect = elChild[0].getBoundingClientRect()
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
      }
    };
  }
})();
