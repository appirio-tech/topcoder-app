import angular from 'angular'
import { loadUser, getCurrentUser } from '../services/userv3.service.js'

(function () {
  'use strict'

  angular.module('tc.listings').controller('ListingsCtrl', ListingsCtrl)

  ListingsCtrl.$inject = ['CONSTANTS', 'logger', '$q','TcAuthService', 'UserService',
    'UserStatsService', 'ProfileService', 'ChallengeService',
    'ExternalAccountService', 'ngDialog', '$anchorScroll', '$scope',
  ]

  function ListingsCtrl(CONSTANTS, logger, $q, TcAuthService, UserService, UserStatsService, ProfileService,
  ChallengeService, ExternalAccountService, ngDialog, $anchorScroll, $scope) {
    var vm = this

    activate()

    function activate() {
      $scope.myChallenges = []
      $scope.userProps = { isAuth: false }
      logger.debug('Calling ListingsController activate()')

      loadUser().then(function(token) {
        // update auth flag
        if(TcAuthService.isAuthenticated()) {
          $scope.userProps = { isAuth: true }
        }
      }, function(error) {
        // do nothing, just show non logged in state of navigation bar
      })
    }

  }

})()
