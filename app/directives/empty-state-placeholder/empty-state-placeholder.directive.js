(function() {
  'use strict';

  angular.module('tcUIComponents')
    .directive('emptyStatePlaceholder', emptyStatePlaceholder);

  function emptyStatePlaceholder() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'directives/empty-state-placeholder/empty-state-placeholder.directive.html',
      scope: {
        title: '@',
        description: '@',
        show: '='
      },
      controller: ['$scope', 'CONSTANTS', '$attrs',
        function($scope, CONSTANTS, $attrs) {
          $scope.DOMAIN = CONSTANTS.domain;
          var vm = this;
          vm.title = $scope.title;
          vm.description = $scope.description;
          console.log($scope.show);
          vm.show = _.get($scope, 'show', false);

          activate();

          function activate() {
            $scope.$watch('show', function (newValue, oldValue) {
              vm.show = newValue;
            })
          }
      }],
      controllerAs: "vm"
    };
  }
})();
