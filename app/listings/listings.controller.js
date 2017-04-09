import _ from 'lodash'
import angular from 'angular'
import { loadUser } from '../services/userv3.service.js'

(function () {
  'use strict'

  angular.module('tc.listings').controller('ListingsCtrl', ListingsCtrl)

  ListingsCtrl.$inject = ['$location', '$scope', 'CONSTANTS', 'logger', '$q',
    'TcAuthService', 'UserService', 'UserStatsService', 'ProfileService', 'ChallengeService', 'ExternalAccountService',
    'ngDialog', '$anchorScroll'
  ]

  function ListingsCtrl($location, $scope, CONSTANTS, logger, $q, TcAuthService,
  UserService, UserStatsService,ProfileService, ChallengeService, ExternalAccountService, ngDialog, $anchorScroll) {
    var vm = this
    var handle
    vm.neverParticipated = false
    vm.loading = true
    vm.userHasChallenges = true
    vm.challengeView = 'tile'

    activate()

    function activate() {
      // listen for location hash update 
      $scope.$on('$locationChangeSuccess', function(event) {
        if($scope.challengeFilter != null) {
          $scope.challengeFilter.updateFilter($location.hash())
        }
      })
      $scope.myChallenges = []
      $scope.reactProps = {
        config: CONSTANTS,
        filterFromUrl: $location.hash(),
        isAuth: false,
        myChallenges: [],
        onSaveFilterToUrl: function(filter) {
          $location.hash(filter)
        },
        setChallengeFilter: function(component) {
          $scope.challengeFilter = component
        }
      }
      logger.debug('Calling ListingsController activate()')
      vm.myChallenges = []
      loadUser().then(function(token) {
        handle = UserService.getUserIdentity().handle

        // update auth flag and get challenges
        if(TcAuthService.isAuthenticated()) {
          getChallenges(handle)
        }
      }, function(error) {
        // do nothing, just show non logged in state of navigation bar
      })
    }

    function getChallenges(handle) {
      var marathonMatchParams = {
        limit: 8,
        filter: 'status=active'
      }

      var challengeParams = {
        limit: 100,
        orderBy: 'submissionEndDate',
        filter: 'status=active'
      }

      $q.all([
        ChallengeService.getUserMarathonMatches(handle, marathonMatchParams),
        ChallengeService.getUserChallenges(handle, challengeParams)
      ]).then(function(challenges){
        var marathonMatches = challenges[0]
        var devDesignChallenges = challenges[1]

        if (!marathonMatches.length && !devDesignChallenges.length) {
          vm.userHasChallenges = false
          _checkForParticipation().then(function() {
            vm.loading = false
          })
        } else {
          ChallengeService.processActiveDevDesignChallenges(devDesignChallenges)
          ChallengeService.processActiveMarathonMatches(marathonMatches)
          var userChallenges = marathonMatches.concat(devDesignChallenges)

          userChallenges = _.sortBy(userChallenges, function(n) {
            return n.registrationEndDate
          })
          vm.myChallenges = userChallenges.reverse().slice(0, userChallenges.length)

          // update myChallenges
          $scope.reactProps = {
            config: CONSTANTS,
            filterFromUrl: $location.hash(),
            isAuth: true,
            myChallenges: vm.myChallenges,
            onSaveFilterToUrl: function(filter) {
              $location.hash(filter)
            },
            setChallengeFilter: function(component) {
              $scope.challengeFilter = component
            }
          }

          vm.userHasChallenges = true
          vm.loading = false
        }
      })
      .catch(function(err) {
        logger.error('Error getting challenges and marathon matches', err)

        vm.userHasChallenges = true
        vm.loading = false
      })
    }

    function _checkForParticipation() {
      return ChallengeService.checkChallengeParticipation(handle, function(participated) {
        vm.neverParticipated = !participated
      })
    }
  }

})()
