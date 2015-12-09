(function() {
  'use strict';

  angular.module('tcUIComponents').directive('onoffSwitch', onoffSwitch);

  function onoffSwitch() {
    return {
      restrict: 'E',
      templateUrl: 'directives/onoffswitch/onoffswitch.directive.html',
      scope: {
        model: '=',
        uniqueId: '='
      },
      link: function(scope, element, attrs) {

      }
    };
  }
})();
