(function() {
  'use strict';

  angular.module('topcoder').controller('TopcoderController', TopcoderController);

  TopcoderController.$inject = ['NotificationService', '$rootScope', '$document', 'CONSTANTS', 'IntroService', '$state', '$stateParams', '$timeout', '$log', 'store', 'UserService'];

  function TopcoderController(NotificationService, $rootScope, $document, CONSTANTS, IntroService, $state, $stateParams, $timeout, $log, store, UserService) {
    var vm = this;
    vm.markIntroCompleted = markIntroCompleted;
    var userHandle = UserService.getUserIdentity().handle;
    var userId = UserService.getUserIdentity().userId;

    activate();

    function activate() {
      $rootScope.DOMAIN = CONSTANTS.domain;
      vm.menuVisible = false;
      vm.globalToasterConfig = {
        'close-button': {
          'toast-warning': true,
          'toast-error': true,
          'toast-success': false
        },
        'body-output-type': 'trustedHtml',
        'position-class': 'toast-top-center'
      };

      $rootScope.$on('$stateChangeStart', function() {
        vm.menuVisible = false;
      });

      $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
        $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
      });

      // TODO - enable this once we support notificaitons
      // $rootScope.$on(CONSTANTS.EVENT_USER_LOGGED_IN, function() {
      //   NotificationService.getNotifications();
      // });





      // TODO: refactor to $watch if possible
      $timeout(function() {
        if (_.contains($state.current.name, 'profile')) {
          if (TcAuthService.isAuthenticated() && $stateParams.userHandle.toLowerCase() === userHandle) {
            if (!store.get(userId).profileIntroComplete) {


              vm.introOptions = IntroService.getIntroData($state.current.name);

              $timeout(function() {
                vm.startIntro();
              }, 0);
            }
          }
        }

      }, 1000);

    }

    function markIntroCompleted() {
      $log.info('Introduction marked as complete.');

      console.log(userId + ' has before setting: ', store.get(userId));
      if (!store.get(userId)) {
        store.set(userId, {
          dashboardIntroComplete: true
        });
      }
      store.set(userId, {})
      console.log(userId + ' has after setting: ', store.get(userId));
    }

  }
})();
