import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('tcPaginator', function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: require('./tc-paginator')(),
      scope: {
        pageParams: '=',
        data: '='
      },
      controller: ['$log', '$scope', '$element', function($log, $scope, $element) {
        $element.addClass('tc-paginator')
        var vm = this

        // pageParams.offset 0 based index of the first challenge to be shown
        // pageParams.limit maximum number of challenges to be shown on the page
        // pageParams.count actual number of challenges shown on the page
        // pageParams.totalCount total number of challenges available for the current filters
        vm.pageParams = $scope.pageParams

        vm.nextPage = nextPage
        vm.prevPage = prevPage
        // flag holding the state of visibility of next pager
        vm.nextPageAvailable = false
        // flag holding the state of visibility of previous pager
        vm.prevPageAvailable = false

        activate()

        function activate() {
          // attaches watcher to watch data changes
          $scope.$watch('data', function(updatedValue) {
            $log.debug('data updated for paginator ', updatedValue)
            init(updatedValue)
          })
        }

        /**
         * Initalizes/Updates paging state.
         */
        function init(data) {
          vm.pageParams.count = data.length
          if (data.metadata) {
            vm.pageParams.totalCount = data.metadata.totalCount
          }
          _validatePager()
        }

        /**
         * Navigate to next page.
         */
        function nextPage() {
          if (vm.nextPageAvailable) {
            vm.pageParams.offset += vm.pageParams.limit
            vm.pageParams.updated++
          }
        }

        /**
         * Navigate to previous page.
         */
        function prevPage() {
          if (vm.prevPageAvailable) {
            vm.pageParams.offset -= vm.pageParams.limit
            vm.pageParams.updated++
          }
        }

        /**
         * Helper method to validate the pager state.
         */
        function _validatePager() {
          if (vm.pageParams.count + vm.pageParams.offset >= vm.pageParams.totalCount) {
            vm.nextPageAvailable = false
          } else {
            vm.nextPageAvailable = true
          }
          if (vm.pageParams.offset <= 0) {
            vm.prevPageAvailable = false
          } else {
            vm.prevPageAvailable = true
          }
        }
      }],
      controllerAs: 'vm'
    }
  })
})()
