import angular from 'angular'
import moment from 'moment'

(function () {
  'use strict'

  angular.module('tc.profile').controller('ProfileCtrl', ProfileCtrl)

  ProfileCtrl.$inject = ['CONSTANTS', 'logger', '$q',
    'TcAuthService', 'UserService', 'UserStatsService', 'ProfileService', 'ChallengeService', 'ExternalAccountService',
    'userHandle', 'profile', 'ngDialog', '$anchorScroll'
  ]

  function ProfileCtrl(CONSTANTS, logger, $q, TcAuthService, UserService, UserStatsService, ProfileService, ChallengeService, ExternalAccountService, userHandle, profile, ngDialog, $anchorScroll) {
    var vm = this
    // set profile to the object that was resolved
    vm.profile = profile
    vm.userHandle = userHandle
    vm.handleColor = ProfileService.getUserHandleColor(profile)
    vm.showBadges = showBadges
    vm.closeDialog = closeDialog
    vm.scrollTo = scrollTo

    vm.imgMap = {
      'DEVELOP': 'develop',
      'DESIGN': 'design',
      'DATA_SCIENCE': 'data',
      'COPILOT': 'copilot'
    }

    vm.status = {
      'badges': CONSTANTS.STATE_LOADING,
      'stats': CONSTANTS.STATE_LOADING,
      'skills': CONSTANTS.STATE_LOADING,
      'externalLinks': CONSTANTS.STATE_LOADING
    }

    activate()

    // adding stats promise on scope so child states can use this.
    vm.statsPromise = ProfileService.getUserStats(vm.userHandle)
      .then(function(stats) {
        if (stats) {
          vm.stats = stats
          vm.profile.tracks = vm.profile.tracks || []
          vm.tracks = ProfileService.getTracks(stats) || vm.profile.tracks
          if (vm.profile.badges.copilot || (stats.COPILOT && stats.COPILOT.contests && vm.profile.tracks.indexOf('COPILOT') == -1)) {
            vm.profile.tracks.push('COPILOT')
          }
          // flag to indicate if the member has acitivity on topcoder to be shown
          // it is set to true, if we get at least one track with showTrack == true
          vm.showTCActivity = false
          vm.numWins = vm.stats.wins
          vm.categories = ProfileService.getRanks(vm.stats)
          for(var trackName in vm.categories) {
            // trackStats is an array of subtrack rankings along with track stats properties (e.g showTrack)
            var trackStats = vm.categories[trackName]
            // flag to indicate if the member has activity for this track
            // it is set to true, if we get at least one subtrack which can be shown for topcoder activity
            trackStats.showTrack = false
            // if track has subtracks with stats
            if (trackStats && trackStats.length > 0) {
              // iterate over each subtrack stat and determine if we need to show as stat
              trackStats.forEach(function(subTrackRank) {
                // process subtack stat
                UserStatsService.processStatRank(subTrackRank)
                // if any of the subtrack has stat to show, enable the showTrack flag for the track
                if (subTrackRank.showStats) {
                  trackStats.showTrack = true
                }
              })
            }
            // if any of the track has stat to show, enable the showTCActivity flag to true
            if (trackStats.showTrack) {
              vm.showTCActivity = true
            }
          }
        } else {
          vm.stats = false
          // vm.profile.tracks = []
          vm.showTCActivity = 0
          vm.numWins = 0
          vm.categories = {}
        }
        vm.status.stats = CONSTANTS.STATE_READY
        return vm.stats
      })
      .catch(function(err) {
        logger.error('Could not get user stats', err)

        vm.status.stats = CONSTANTS.STATE_ERROR
      })

    vm.skillsPromise = ProfileService.getUserSkills(vm.userHandle)
      .then(function(skills) {
        vm.skills = skills.skills
        vm.status.skills = CONSTANTS.STATE_READY
      })
      .catch(function(err) {
        logger.error('Could not get user skills', err)

        vm.status.skills = CONSTANTS.STATE_ERROR
      })

    function activate() {
      logger.debug('Calling ProfileController activate()')
      // show edit profile link if user is authenticated and is viewing their own profile
      vm.showEditProfileLink = TcAuthService.isAuthenticated() && UserService.getUserIdentity().handle.toLowerCase() === vm.userHandle.toLowerCase()
      vm.isUser = vm.showEditProfileLink
      if (profile.createdAt) {
        profile.startMonth = moment(profile.createdAt).format('MMMM, YYYY')
      } else {
        profile.startMonth = null
      }
      UserService.getV2UserProfile(vm.userHandle).then(function(resp) {
        vm.profile.badges = resp
      })

    }

    function showBadges() {
      ngDialog.open({
        plain: true,
        template: require('./badges/badges')(),
        controller: 'BadgesController',
        controllerAs: 'vm',
        className: 'ngdialog-theme-default',
        resolve: {
          userHandle: function() {
            return vm.userHandle
          },
          profile: function() {
            return vm.profile
          }
        }
      })
    }

    function closeDialog() {
      ngDialog.closeAll()
    }

    function scrollTo(track) {
      $anchorScroll(track + '_TRACK')
    }
  }

})()
