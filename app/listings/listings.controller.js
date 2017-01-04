import angular from 'angular'
import moment from 'moment'

(function () {
  'use strict'

  angular.module('tc.listings').controller('ListingsCtrl', ListingsCtrl)

  ListingsCtrl.$inject = ['CONSTANTS', 'logger', '$q',
    'TcAuthService', 'UserService', 'UserStatsService', 'ProfileService', 'ChallengeService', 'ExternalAccountService',
    'userHandle', 'profile', 'ngDialog', '$anchorScroll'
  ]

  function ListingsCtrl(CONSTANTS, logger, $q, TcAuthService, UserService, UserStatsService, ProfileService, ChallengeService, ExternalAccountService, userHandle, profile, ngDialog, $anchorScroll) {
    var vm = this
    // set profile to the object that was resolved

    activate()

    function activate() {
      logger.debug('Calling ListingsController activate()')

    }
  }

})()
