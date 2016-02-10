import angular from 'angular'

(function () {
  'use strict'

  // Gets around Angular's inability to bind to file input's change event
  // See https://github.com/angular/angular.js/issues/1375
  angular.module('tcUIComponents').directive('onFileChange', onFileChangeDirective)

  onFileChangeDirective.$inject = []

  function onFileChangeDirective() {
    return {
      restrict: 'A',
      link: function(scope, element, attr, ctrl) {
        element.bind('change', function() {
          scope.vm.onFileChange(element[0].files[0])
          this.value = ''
        })
      }
    }
  }

})()
