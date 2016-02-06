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
        controller: ['$log', function($log, $scope, $element) {
          $log = $log.getInstance('TcTabSetController')
          this.tabs = []
          this.addTab = function addTab(tab) {
            this.tabs.push(tab)
            if (this.tabs.length === 1) {
              tab.active = true
            }
          }

          this.select = function(selectedTab) {
            angular.forEach(this.tabs, function(tab) {
              if (tab.active && tab !== selectedTab) {
                tab.active = false
              }
            })

            selectedTab.active = true
          }
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
