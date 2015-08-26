(function() {
  'use strict';

  angular.module('tcUIComponents').directive('distributionGraph', distributionGraph);

  function distributionGraph() {
    return {
      restrict: 'E',
      templateUrl: function(elem, attrs) {
        return 'directives/distribution-graph/distribution-graph.directive.html';
      },
      scope: {
        data: '='
      },
      controller: ['$scope']
    };
  }

  function DistributionGraphController($scope) {
    
  }

})();
