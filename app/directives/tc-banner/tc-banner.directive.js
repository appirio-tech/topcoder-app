import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tcUIComponents')
    .directive('tcBanner', tcBanner)

  tcBanner.$inject = ['CONSTANTS', 'BannerDataService']

  function tcBanner(CONSTANTS, BannerDataService) {
    return {
      restrict: 'E',
      transclude: true,
      template: require('./tc-banner')(),
      scope: {
        bannerName: '@',
        theme: '@'
      },
      link : function(scope, element, attrs) {
        var rootDiv = angular.element(element.children()[0])
        var contentDiv = _.find(rootDiv.children(), function(el) {
          return angular.element(el).hasClass('content')
        })
        scope.transcluded = angular.element(contentDiv)[0].children.length > 0
      },
      controller: ['$scope', '$attrs', '$element', '$parse', '$rootScope', function($scope, $attrs, $element, $parse, $rootScope) {
        $scope.DOMAIN = CONSTANTS.domain
        var vm = this
        vm.title = null
        vm.description = null
        vm.img = null
        vm.theme = _.get($scope, 'theme', null)
        vm.ctas = null

        activate()

        vm.handleClick  = function(_link) {
          $rootScope.$broadcast(_link.eventName)
        }

        function activate() {
          var banner = BannerDataService.getBanner($scope.bannerName)
          if (banner) {
            vm.title = banner.title
            vm.img = banner.img
            vm.description = banner.description
            vm.ctas = banner.ctas
          }
        }
      }],
      controllerAs: 'vm'
    }
  }
})()
