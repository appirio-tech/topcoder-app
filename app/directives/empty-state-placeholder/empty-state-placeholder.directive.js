(function() {
  'use strict';

  angular.module('tcUIComponents')
    .directive('emptyStatePlaceholder', emptyStatePlaceholder);

  emptyStatePlaceholder.$inject = ['CONSTANTS', 'EmptyStateService'];

  function emptyStatePlaceholder(CONSTANTS, EmptyStateService) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'directives/empty-state-placeholder/empty-state-placeholder.directive.html',
      scope: {
        show: '=',
        stateName: '@',
        theme: '@'
      },
      link : function(scope, element, attrs) {
        var rootDiv = angular.element(element.children()[0]);
        var contentDiv = _.find(rootDiv.children(), function(el) {
          return angular.element(el).hasClass("content");
        });
        scope.transcluded = angular.element(contentDiv)[0].children.length > 0;
      },
      controller: ['$scope', '$attrs', '$element', '$parse', '$rootScope',
        function($scope, $attrs, $element, $parse, $rootScope) {
          $scope.DOMAIN = CONSTANTS.domain;
          var vm = this;
          vm.title = null;
          vm.description = null;
          vm.theme = _.get($scope, 'theme', null);
          vm.helpLinks = null;
          vm.show = _.get($scope, 'show', false);

          activate();

          vm.handleClick  = function(_link) {
            $rootScope.$broadcast(_link.eventName);
          }

          function activate() {
            var state = EmptyStateService.getState($scope.stateName);
            if (state) {
              vm.title = state.title;
              vm.description = state.description;
              vm.helpLinks = state.helpLinks;
              $scope.$watch('show', function (newValue, oldValue) {
                vm.show = newValue;
              });
            }
          }
      }],
      controllerAs: "vm"
    };
  }
})();
