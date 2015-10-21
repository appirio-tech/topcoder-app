(function() {
  'use strict';
  angular.module('tcUIComponents')
    .directive('tcTabSet', function() {
      return {
        restrict: 'E',
        transclude: true,
        bindToController: true,
        templateUrl: 'directives/tc-tabs/tc-tabs.directive.html',
        scope: {},
        controller: ['$log', function($log, $scope, $element) {
          $log = $log.getInstance('TcTabSetController');
          var self = this;
          self.tabs = [];
          self.addTab = function addTab(tab) {
            self.tabs.push(tab);
            if (self.tabs.length === 1) {
              tab.active = true;
            }
          };

          self.select = function(selectedTab) {
            angular.forEach(self.tabs, function(tab) {
              if (tab.active && tab !== selectedTab) {
                tab.active = false;
              }
            })

            selectedTab.active = true;
          }
        }],
        controllerAs: "tabSet"
      };
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
          scope.active = false;
          tabSetCtrl.addTab(scope);
        }
      }
    });
})();
