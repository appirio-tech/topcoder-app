import angular from 'angular'
import moment from 'moment'

(function () {
  'use strict'

  angular.module('tc.listings').controller('ListingsCtrl', ListingsCtrl)

  ListingsCtrl.$inject = ['CONSTANTS', 'logger', '$q',
    'TcAuthService', 'UserService', 'UserStatsService', 'ProfileService', 'ChallengeService', 'ExternalAccountService',
    'ngDialog', '$anchorScroll'
  ]

  function ListingsCtrl(CONSTANTS, logger, $q, TcAuthService, UserService, UserStatsService, ProfileService, ChallengeService, ExternalAccountService, ngDialog, $anchorScroll) {
    var vm = this

    activate()

    function activate() {
      logger.debug('Calling ListingsController activate()')

    }
  }

})()
