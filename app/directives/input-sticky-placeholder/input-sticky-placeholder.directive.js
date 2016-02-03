import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('inputStickyPlaceholder', inputStickyPlaceholder)

  /*
   *  ******
   *         Make sure to add padding-right to the input element
   *         so that the text entered does not overlap with the
   *         sticky-placeholder
   *  ******
   *
   *  Example:
   *  input-sticky-placeholder(sticky-placeholder="First", ng-model="vm.firstname")
   *    input(ng-model="vm.firstname", ...)
   *
   */

  function inputStickyPlaceholder() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: require('./input-sticky-placeholder')(),
      link: function(scope, element, attrs) {
        var span = angular.element(element[0].children[1])
        var input = angular.element(element[0].children[0].children[0])
        span.text('')

        scope.$watch(function() {
          return input.val()
        }, function(newValue, oldValue) {
          span.text('')

          if (newValue && newValue.length) {
            span.text(attrs.stickyPlaceholder)
          }
        })
      }
    }
  }
})()
