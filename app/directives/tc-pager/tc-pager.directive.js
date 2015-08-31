(function() {
  'use strict';
  angular.module('tcUIComponents').directive('tcPager', function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'directives/tc-pager/tc-pager.html',
      scope: {
        reloadPromise: '&',
        data: '=data',
        pageParams: '='
      },
      controller: ['$log', '$scope', '$element', function($log, $scope, $element) {
        $log.debug("reloadPromise ", $scope.reloadPromise);
        $element.addClass('tc-pager');
        var vm = this;

        // pageParams.offset 0 based index of the first challenge to be shown
        // pageParams.limit maximum number of challenges to be shown on the page
        // pageParams.count actual number of challenges shown on the page
        // pageParams.totalCount total number of challenges available for the current filters
        vm.pageParams = $scope.pageParams;

        vm.nextPage = nextPage;
        vm.prevPage = prevPage;
        // flag holding the state of visibility of next pager
        vm.nextPageAvailable = false;
        // flag holding the state of visibility of previous pager
        vm.prevPageAvailable = false;
        vm.init = init;

        init($scope.data);

        function init(result) {
          vm.pageParams.count = result.length;
          vm.pageParams.totalCount = result.metadata.totalCount;
          _validatePager();
        }

        function nextPage() {
          vm.pageParams.offset += vm.pageParams.limit;
          $scope.reloadPromise()().then(function(result) {
            vm.pageParams.count = result.length;
            vm.pageParams.totalCount = result.metadata.totalCount;
            _validatePager();
          });
        }

        function prevPage() {
          vm.pageParams.offset -= vm.pageParams.limit;
          $scope.reloadPromise()().then(function() {
            vm.pageParams.count = result.length;
            vm.pageParams.totalCount = result.metadata.totalCount;
            _validatePager();
          });
        }

        /**
         * Helper method to validate the pager state.
         */
        function _validatePager() {
          if (vm.pageParams.count + vm.pageParams.offset >= vm.pageParams.totalCount) {
            vm.nextPageAvailable = false;
          } else {
            vm.nextPageAvailable = true;
          }
          if (vm.pageParams.offset <= 0) {
            vm.prevPageAvailable = false;
          } else {
            vm.prevPageAvailable = true;
          }
        }
      }],
      controllerAs: 'vm'
    };
  });
})();
