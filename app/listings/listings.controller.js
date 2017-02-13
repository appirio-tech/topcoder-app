import angular from 'angular'
import { loadUser } from '../services/userv3.service.js'

(function () {
  'use strict'

  angular.module('tc.listings').controller('ListingsCtrl', ListingsCtrl)

  ListingsCtrl.$inject = ['$location', '$scope', 'CONSTANTS', 'logger', '$q',
    'TcAuthService', 'UserService', 'UserStatsService', 'ProfileService', 'ChallengeService', 'ExternalAccountService',
    'ngDialog', '$anchorScroll'
  ]

  function ListingsCtrl($location, $scope, CONSTANTS, logger, $q, TcAuthService, UserService, UserStatsService, ProfileService, ChallengeService, ExternalAccountService, ngDialog, $anchorScroll) {

    activate()

    $scope.listingProps = {
      filterFromUrl: $location.hash(),
      onSaveFilterToUrl: function(filter) {
        $location.hash(filter)
      }
    }

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
