
(function() {
  'use strict';

  angular.module('tcUIComponents').directive('badgeTooltip', badgeTooltip);

  /**
   * Add a badge tooltip.
   */
  function badgeTooltip() {
    return {
      restrict: 'A',
      templateUrl: 'directives/badges/badge-tooltip.html',
      scope: {
        badge: '='
      },
      link : function(scope, element, attr) {
        scope.hide = true;
        return new TcBadgeTooltipDirective(scope, element, attr);
      }
    }
  }

  /**
   * The link function of directive tc-badge-tooltip
   */
  var TcBadgeTooltipDirective = function (scope, element, attr) {

    var tooltipElement = element.children(0);
    if (!tooltipElement.hasClass('tooltip')) {
      return;
    }
    var tooltipHtml = tooltipElement[0];

    var tooltipFn = this;

    element.on('mouseenter', function() {
      tooltipElement.css('z-index', '-2000');
      scope.hide = false;
      // apply scope to display the tooltip element at z-index -2000
      // otherwise we won't get the height of the element
      scope.$apply();

      var ht = tooltipHtml.offsetHeight;
      var wt = tooltipHtml.offsetWidth - element[0].offsetWidth;
      var top  = element[0].offsetTop - ht - 10;
      var lt = element[0].offsetLeft - wt / 2;

      tooltipElement.css("left", lt + 'px');
      tooltipElement.css("top", top + 'px');
      tooltipElement.css('z-index', '2000');
    });

    element.on('mouseleave', function(){
      scope.hide = true;
      scope.$apply();
    });
  }
})();
