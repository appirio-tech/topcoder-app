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
        promise: '='
      },
      controller: ['$scope', DistributionGraphController]
    };
  }

  function DistributionGraphController($scope) {
    var w       = 600,
        h       = 350,
        padding = 100;

    activate();

    function activate() {
      $scope.promise.then(function(data) {
        $scope.distribution = data.distribution;
        console.log($scope.distribution);
      });
    }
    //var xScale = d3.scale.ordinal()
    //               .domain(d3.range(data.length))
  }

})();
