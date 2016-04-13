import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents')
    .directive('tcTabSet', function() {
      return {
        restrict: 'E',
        transclude: true,
        bindToController: true,
        template: require('./tc-tabs')(),
        scope: {},
        controller: ['$location', '$scope', function($location, $scope, $element) {
          this.tabs = []

          this.addTab = function addTab(tab) {
            this.tabs.push(tab)

            if (!angular.isDefined($location.search().tab) && this.tabs.length === 1) {
              tab.active = true
            } else if ($location.search().tab === tab.heading) {
              tab.active = true
            }
          }

          this.select = function(selectedTab) {
            var select = false

            angular.forEach(this.tabs, function(tab) {
              if (tab.active && tab.heading !== selectedTab.heading) {
                tab.active = false
              } else if (tab.heading === selectedTab.heading) {
                tab.active = true
                select = true
              }
            })

            if (select === false && this.tabs.length > 0) {
              this.tabs[0].active = true
            }
          }

          this.setTab = function(tab) {
            if ($location.search().tab !== tab.heading) {
              $location.search('tab', tab.heading)
            }
          }

          $scope.$on('$locationChangeSuccess', () => {
            var tab
            if (angular.isDefined($location.search().tab)) {
              tab = $location.search().tab
              this.select({'heading' : tab})
            } else if (this.tabs.length > 0) {
              tab = this.tabs[0].heading
              this.select({'heading' : tab})
            }
          })
        }],
        controllerAs: 'tabSet'
      }
    })
    .directive('tcTab', function() {
      return {
        restrict: 'E',
        transclude: true,
        template: '<div ng-show="active", ng-transclude></div>',
        require: '^tcTabSet',
        scope: {
          heading: '@'
        },
        link: function(scope, elem, attr, tabSetCtrl) {
          scope.active = false
          tabSetCtrl.addTab(scope)
        }
      }
    })
})()
