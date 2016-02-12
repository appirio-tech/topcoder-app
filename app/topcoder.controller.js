import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder').controller('TopcoderController', TopcoderController)

  TopcoderController.$inject = ['$rootScope', '$document', 'CONSTANTS', 'IntroService', '$timeout']

  function TopcoderController($rootScope, $document, CONSTANTS, IntroService, $timeout) {
    var vm = this

    activate()

    function activate() {
      $rootScope.DOMAIN = CONSTANTS.domain
      vm.menuVisible = false
      vm.globalToasterConfig = {
        'close-button': {
          'toast-warning': true,
          'toast-error': true,
          'toast-success': false
        },
        'body-output-type': 'trustedHtml',
        'position-class': 'toast-top-center'
      }

      $rootScope.$on('$stateChangeStart', function() {
        vm.menuVisible = false
      })

      $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
        $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0

        vm.introOptions = IntroService.getCurrentPageOptions()

        $timeout(function() {
          if (vm.introOptions) {
            vm.startIntro()
          }
        }, 0)
      })
    }
  }
})()
