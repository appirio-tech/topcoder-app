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
        controller: ['$log', '$location', '$scope', function($log, $location, $scope, $element) {
          $log = $log.getInstance('TcTabSetController')
          var self = this
          self.tabs = []
          self.addTab = function addTab(tab) {
            self.tabs.push(tab)
            if (!angular.isDefined($location.search().tab) && self.tabs.length === 1) {
              tab.active = true;
            } else if ($location.search().tab === tab.heading) {
              tab.active = true;
            }
          }

          self.select = function(selectedTab) {
            var select = false;
            angular.forEach(self.tabs, function(tab) {
              if (tab.active && tab.heading !== selectedTab.heading) {
                tab.active = false;
              } else if (tab.heading === selectedTab.heading) {
                tab.active = true;
                select = true;
              }
            });
            if (select === false && self.tabs.length > 0) {
              self.tabs[0].active = true;
            }
          }

          self.setTab = function(tab) {
            if ($location.search().tab !== tab.heading) {
              $location.search('tab', tab.heading);
            }
          }
          $scope.$on( "$locationChangeSuccess", function(){
            if (angular.isDefined($location.search().tab)) {
              var tab = $location.search().tab;
              self.select({'heading' : tab});
            } else if (self.tabs.length > 0) {
              var tab = self.tabs[0].heading;
              self.select({'heading' : tab});
            }
          });

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
