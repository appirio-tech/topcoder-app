import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tc.skill-picker').controller('SkillPickerController', SkillPickerController)

  SkillPickerController.$inject = ['$scope', 'CONSTANTS', 'ProfileService', '$state', 'userProfile', 'featuredSkills', 'logger', 'toaster', 'MemberCertService','GroupService', '$q']

  function SkillPickerController($scope, CONSTANTS, ProfileService, $state, userProfile, featuredSkills, logger, toaster, MemberCertService, GroupService, $q) {
    var vm = this
    vm.ASSET_PREFIX = CONSTANTS.ASSET_PREFIX
    vm.IOS_PROGRAM_ID = parseInt(CONSTANTS.SWIFT_PROGRAM_ID)
    vm.PREDIX_PROGRAM_ID = parseInt(CONSTANTS.PREDIX_PROGRAM_ID)
    vm.IBM_COGNITIVE_PROGRAM_ID = parseInt(CONSTANTS.IBM_COGNITIVE_PROGRAM_ID)
    vm.BLOCKCHAIN_PROGRAM_ID = parseInt(CONSTANTS.BLOCKCHAIN_PROGRAM_ID)
    vm.submitSkills = submitSkills
    vm.featuredSkills = featuredSkills
    vm.userId = userProfile.userId
    vm.username = userProfile.handle
    vm.toggleSkill = toggleSkill
    vm.tracks = {}
    vm.mySkills = []
    vm.disableDoneButton = false
    vm.showCommunity = true
    vm.loadingCommunities = false
    vm.communities = {}
    vm.isPageDirty = isPageDirty
    vm.isTracksDirty = isTracksDirty
    vm.isCommunitySelected = isCommunitySelected
    vm.isPageStateDirty = false
    ///////
    activate()

    /**
     * Activates the controller.
     */
    function activate() {
      initCommunities()
      checkCommunityStatus()
    }

    /**
     * Verfies if the page state has been modified by the user in any way.
     */
    function isPageDirty() {      
      return isTracksDirty() || isCommunitiesDirty()
    }

    /**
     * Verfies if the tracks section state has been modified by the user in any way.
     */
    function isTracksDirty() {
      vm.isPageStateDirty = true
      return vm.tracks.DESIGN || vm.tracks.DEVELOP || vm.tracks.DATA_SCIENCE
    }
    /**
     * Verfies if the communities section state has been modified by the user in any way.
     */
    function isCommunitySelected() {
      vm.isPageStateDirty = true
      var community = _.find(vm.communities, {status: true, display: true})
      return !!community
    }

    /**
     * Verfies if the communities section state has been modified by the user in any way.
     */
    function isCommunitiesDirty() {
      var community = _.find(vm.communities, {dirty: true})
      return !!community
    }

    /**
     * Initializes the communities to show in the communities section.
     */
    function initCommunities() {
      vm.communities['ibm_cognitive'] = {
        displayName: 'Cognitive',
        programId: vm.IBM_COGNITIVE_PROGRAM_ID,
        status: true,
        dirty: true,
        display: true
      }
      vm.communities['blockchain'] = {
        displayName: 'Blockchain',
        programId: vm.BLOCKCHAIN_PROGRAM_ID,
        status: false,
        dirty: false,
        display: true,
        groupCommunity: true
      }
      vm.communities['ios'] = {
        displayName: 'iOS',
        programId: vm.IOS_PROGRAM_ID,
        status: false,
        dirty: false,
        display: true
      }
      vm.communities['predix'] = {
        displayName: 'Predix',
        programId: vm.PREDIX_PROGRAM_ID,
        status: false,
        dirty: false,
        display: true
      }      
      _addWatchToCommunity(vm.communities['ios'])
      _addWatchToCommunity(vm.communities['blockchain'])
      _addWatchToCommunity(vm.communities['predix'])
      _addWatchToCommunity(vm.communities['ibm_cognitive'])      
    }

    /**
     * Helper method to add watch to given object.
     */
    function _addWatchToCommunity(community) {
      community.unregister = $scope.$watch(
        function() { return community },
        function(newValue, oldValue) {
          if (oldValue && newValue.status !== oldValue.status) {
            newValue.dirty = oldValue.dirty ? false : true
          }
        },
        true
      )
    }

    /**
     * Checks registration status of each community and updates the state of each community.
     */
    function checkCommunityStatus() {
      var eventAPIpromises = [], groupAPIPromises = []
      for (var name in vm.communities) {
        var community = vm.communities[name]
        if(community.groupCommunity){
          groupAPIPromises.push(GroupService.getMembers(vm.userId, community.programId))
        }else{
          eventAPIpromises.push(MemberCertService.getMemberRegistration(vm.userId, community.programId))    
        }
      }

      vm.loadingCommunities = true

      $q.all(groupAPIPromises)
      .then(function(responses) {
        let members = responses[0] || []
        vm.loadingCommunities = false
        members.forEach(function(member) {
          if (member && member.memberId === vm.userId) {
            addWatchToExistingCommunity(member.groupId)
          }
        })        
      })
      .catch(function(err) {
        logger.error('Could not load communities with group data', err)
        vm.loadingCommunities = false
      })

      $q.all(eventAPIpromises)
      .then(function(responses) {
        vm.loadingCommunities = false
        responses.forEach(function(program) {
          if (program) {            
            addWatchToExistingCommunity(program.eventId)
          }
        })
      })
      .catch(function(err) {
        logger.error('Could not load communities with member cert registration data', err)
        vm.loadingCommunities = false
      })
    }

    function addWatchToExistingCommunity(programId){
      var community = _.find(vm.communities, {programId: programId})
      if (community) {              
        community.status = true
        if (community.unregister){
          community.unregister()
          _addWatchToCommunity(community)
        }
      }
    }

    /**
     * Toggles the given skill for the user. If it is not added, adds it and if already added, removes it.
     */
    function toggleSkill(tagId) {
      var _idx = vm.mySkills.indexOf(tagId.toString())
      if (_idx > -1) {
        // remove
        vm.mySkills.splice(_idx, 1)
      } else {
        // add
        vm.mySkills.push(tagId.toString())
      }
    }

    /**
     * Persists the user's altered information.
     */
    function submitSkills() {

      vm.saving = true

      var promises = []
      if (isTracksDirty()) {
        // save tracks
        userProfile.tracks = _.reduce(vm.tracks, function(result, isInterested, trackName) {
          if (isInterested) {
            result.push(trackName)
          }
          return result
        }, [])
        promises.push(userProfile.save())
      }
      if (vm.mySkills.length > 0) {
        // save skills
        var data = {}
        for (var i = 0; i < vm.mySkills.length; i++) {
          data[vm.mySkills[i]] = {
            hidden: false
          }
        }
        promises.push(ProfileService.updateUserSkills(vm.username, data))
      }

      if (isCommunitiesDirty()) {
        for(var communityName in vm.communities) {
          var community = vm.communities[communityName]
          if (community.dirty === true) {
            if (community.status === true) {
              if(community.groupCommunity){
                promises.push(GroupService.addMember(vm.userId, community.programId))
              }else{
                promises.push(MemberCertService.registerMember(vm.userId, community.programId))                
              }
            }
          }
        }
      }

      $q.all(promises)
      .then(function(responses) {
        vm.saving = false
        toaster.pop('success', 'Success!', 'Your skills have been updated.')
        vm.disableDoneButton = true
        $state.go('dashboard')
      })
      .catch(function(err) {
        logger.error('Could not update update user skills or register members for community', err)
        vm.saving = false
        toaster.pop('error', 'Whoops!', 'Something went wrong. Please try again later.')
      })
    }
  }
})()
