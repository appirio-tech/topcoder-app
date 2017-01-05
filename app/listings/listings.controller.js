import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.listings').controller('ListingsCtrl', ListingsCtrl)

  ListingsCtrl.$inject = ['CONSTANTS', 'logger', '$q',
    'TcAuthService', 'UserService', 'UserStatsService', 'ProfileService', 'ChallengeService', 'ExternalAccountService',
    'ngDialog', '$anchorScroll'
  ]

  function ListingsCtrl(CONSTANTS, logger, $q, TcAuthService, UserService, UserStatsService, ProfileService, ChallengeService, ExternalAccountService, ngDialog, $anchorScroll) {

    activate()

    function activate() {
      logger.debug('Calling ListingsController activate()')

    }
  }

})()
