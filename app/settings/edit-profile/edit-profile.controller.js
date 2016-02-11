import angular from 'angular'
import _ from 'lodash'

(function () {
  'use strict'

  angular.module('tc.settings').controller('EditProfileController', EditProfileController)

  EditProfileController.$inject = ['$rootScope', 'userData', 'userHandle', 'ProfileService', 'ExternalAccountService', 'ExternalWebLinksService', '$log', 'ISO3166', 'ImageService', 'CONSTANTS', 'TagsService', 'toaster', '$q', '$scope']

  function EditProfileController($rootScope, userData, userHandle, ProfileService, ExternalAccountService, ExternalWebLinksService, $log, ISO3166, ImageService, CONSTANTS, TagsService, toaster, $q, $scope) {
    $log = $log.getInstance('EditProfileCtrl')
    var vm = this
    vm.toggleTrack    = toggleTrack
    vm.updateCountry  = updateCountry
    vm.onFileChange   = onFileChange
    vm.updateProfile  = updateProfile
    vm.addSkill = addSkill
    vm.deleteImage = deleteImage
    vm.changeImage = changeImage
    vm.tracksValid = tracksValid

    activate()

    function activate() {
      vm.userData = userData.clone()
      vm.originalUserData = userData
      vm.linkedExternalAccounts = []
      vm.linkedExternalAccountsData = {}
      vm.skills = false
      vm.tags = []
      vm.profileFormProcessing = false
      vm.tracks = {}
      vm.isValidCountry = true

      vm.countries = ISO3166.getAllCountryObjects()
      vm.countryObj = ISO3166.getCountryObjFromAlpha3(vm.userData.competitionCountryCode)

      processData(vm.userData)

      var userId = vm.userData.userId
      var userHandle = vm.userData.handle
      var _linksPromises = [
        ExternalAccountService.getAllExternalLinks(userHandle, userId, true),
        ExternalWebLinksService.getLinks(userHandle, true)
      ]
      $q.all(_linksPromises).then(function(data) {
        vm.linkedExternalAccountsData = data[0].concat(data[1])
      })
      ExternalAccountService.getLinkedAccounts(userId)
        .then(function(data) {
          vm.linkedExternalAccounts = data
        })

      TagsService.getApprovedSkillTags()
      .then(function(tags) {
        vm.tags = tags
      })
      .catch(function(err) {
        $log.error(JSON.stringify(err))
      })

      ProfileService.getUserSkills(vm.userData.handle)
      .then(function(skills) {
        vm.skills = _.map(skills.skills, function(el) {
          return _.extend({}, el, {isNew: 0})
        })
      })
      .catch(function(err) {
        $log.error(JSON.stringify(err))
      })
    }

    function addSkill(skill) {
      if (skill) {
        var skillTagId = _.get(skill, 'id', undefined).toString()

        var isSkillAlreadyAdded = _.find(vm.skills, function(s) { return s.tagId == skillTagId})

        if (!isSkillAlreadyAdded) {
          ProfileService.addUserSkill(vm.userData.handle, skillTagId).then(function(resp) {
            // find the new skill in response object and inject it into our existing list.
            // we dont want to replace the entire object / map  because we will lose hidden tags
            var newSkill = _.find(resp.skills, {tagId: skillTagId})
            newSkill.isNew = new Date().getTime()
            vm.skills.push(newSkill)
            toaster.pop('success', 'Success!', 'Skill added.')
          })
        } else {
          toaster.pop('note', null, 'You\'ve already added that skill.')
        }
      }
    }

    function tracksValid() {
      return vm.tracks.DEVELOP || vm.tracks.DESIGN || vm.tracks.DATA_SCIENCE
    }

    function updateCountry(countryObj) {
      // Hitting backspace sends an empty array as the value instead of {} or null
      if (Array.isArray(countryObj)) {
        vm.countryObj = null
        return
      }
      
      vm.editProfile.$setDirty()
      var countryCode = _.get(countryObj, 'alpha3', undefined)
      vm.userData.competitionCountryCode = countryCode
      vm.isValidCountry = _.isUndefined(countryCode) ? false : true
      vm.countryObj = countryObj
    }

    function onFileChange(file) {
      ImageService.getPresignedUrl(userHandle, file)
      .then(ImageService.uploadFileToS3)
      .then(ImageService.createFileRecord)
      .then(function(newPhotoURL) {
        vm.userData.photoURL = newPhotoURL
        userData.photoURL = newPhotoURL
        $rootScope.$broadcast(CONSTANTS.EVENT_PROFILE_UPDATED)
      })
    }

    function updateProfile() {
      if (!vm.tracksValid()) {
        toaster.pop('error', 'Error', 'Please select at least one track.')
        return false
      }
      vm.profileFormProcessing = true
      vm.userData.tracks = _.reduce(vm.tracks, function(result, isInterested, trackName) {
        if (isInterested) {
          result.push(trackName)
        }
        return result
      }, [])

      ProfileService.updateUserProfile(vm.userData)
      .then(function() {
        vm.profileFormProcessing = false
        vm.editProfile.$setPristine()
        $log.info('Saved successfully')
        toaster.pop('success', 'Success!', 'Your account information was updated.')
        for (var k in vm.userData) userData[k] = vm.userData[k]
      })
      .catch(function(err) {
        vm.profileFormProcessing = false
        $log.error(err)
        toaster.pop('error', 'Whoops!', 'Something went wrong. Please try again later.')
      })
    }

    function toggleTrack(track) {
      vm.tracks[track] = !vm.tracks[track]
    }

    function processData(userInfo) {
      vm.tracks = {
        DESIGN: _.contains(userInfo.tracks, 'DESIGN'),
        DEVELOP: _.contains(userInfo.tracks, 'DEVELOP'),
        DATA_SCIENCE: _.contains(userInfo.tracks, 'DATA_SCIENCE')
      }
    }

    function deleteImage() {
      var userData = vm.originalUserData
      var oldPhotoURL = userData.photoURL
      delete userData['photoURL']
      userData.tracks = userData.tracks || []
      ProfileService.updateUserProfile(userData)
      .then(function() {
        vm.userData.photoURL = ''
        $log.info('Saved successfully')
        toaster.pop('success', 'Success!', 'Your account information was updated.')
      })
      .catch(function(err) {
        vm.profileFormProcessing = false
        $log.error(err)
        vm.userData.photoURL = oldPhotoURL
        vm.originalUserData.photoURL = oldPhotoURL
        toaster.pop('error', 'Whoops!', 'Something went wrong. Please try again later.')
      })
    }

    function changeImage() {
      var fileInput = document.querySelector('#change-image-input')
      fileInput.click() // Or, use the native click() of the file input.
    }
  }
})()
