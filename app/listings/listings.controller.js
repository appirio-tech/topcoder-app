import angular from 'angular'

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
      logger.debug('Calling ListingsController activate()')

    }
  }

})()
