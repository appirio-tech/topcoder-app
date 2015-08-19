
(function() {
  'use strict';

  angular.module('tcUIComponents').directive('badgeTooltip', badgeTooltip);

  /**
   * Add a badge tooltip.
   */
  function badgeTooltip() {
    console.log('badgeTooltip');
    return {
      restrict: 'A',
      template: "<div class='tooltip' ng-hide='hide'> " +
                  "<div class='.inner'> " +
                    "<header ng-bind='badge.name'></header> " +
                    "<div class='.data'> " +
                      "<p class'earnedOn' ng-bind='badge.date'></p> " +
                    "</div>" +
                    "<div class='.data'> " +
                      "<p class=.currentlyEarned'>" +
                        "<span ng-bind='badge.currentlyEarned'></span>" +
                      "</p>" +
                    "</div>" +
                    "<div class='.arrow'></div> " +
                  "</div>" +
                "</div>",
      scope: {
        badge: '=',
        hide: true
      },
      link : function(scope, element, attr){
        return new TcBadgeTooltipDirective(scope, element, attr);
      }
    }
  }

  /**
   * The link function of directive tc-badge-tooltip
   */
  var TcBadgeTooltipDirective = function (scope, element, attr) {

    var tooltipHtml = angular.element(element);//angular.element('#badgeTooltip');

    var tooltipFn = this;

    element.on('mouseenter', function(){
      //tooltipFn.populateTooltip(scope, tooltipHtml, attr);

      tooltipHtml.css('z-index', '-2000');
      scope.hide = false;
      var ht = tooltipHtml.height();
      var wt = tooltipHtml.width() - element.width();
      var top  = element.offset().top - ht - 10;
      var lt = element.offset().left - wt / 2;
      tooltipHtml.offset({left : lt, top : top});
      tooltipHtml.css('z-index', '2000');
    });

    element.on('mouseleave', function(){
      scope.hide = true;
    });
  }
})();
