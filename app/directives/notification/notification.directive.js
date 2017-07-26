import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('notification', notification)

  function notification() {
    return {
      restrict: 'E',
      template: require('./notification')(),
      scope: {
        config: '='
      },
      controller: ['CONSTANTS', '$sce', controller],
      controllerAs: 'vm'
    }
  }

  function controller(CONSTANTS, $sce){
    var vm = this
    vm.defaultHeight = CONSTANTS.VIDEO_DEFAULT_HEIGHT
    vm.expanded = false
    vm.toggle = toggle
    vm.loadImage = loadImage
    vm.videoUrl = videoUrl

    activate()

    function activate(){

    }

    function toggle(){
      vm.expanded = !vm.expanded
    }

    function loadImage(image){
      return require('../../../assets/images/news/' + image)
    }

    function videoUrl(url){
      return $sce.trustAsResourceUrl(url)
    }
  }
})()
