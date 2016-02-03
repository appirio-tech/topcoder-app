import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.profile').controller('ProfileAboutController', ProfileAboutController)

  ProfileAboutController.$inject = ['$log', '$scope', '$q', 'ExternalAccountService', 'ExternalWebLinksService', 'UserService', 'CONSTANTS']

  function ProfileAboutController($log, $scope, $q, ExternalAccountService, ExternalWebLinksService, UserService, CONSTANTS) {
    var vm = this
    $log = $log.getInstance('ProfileAboutController')
    var profileVm = $scope.$parent.profileVm
    vm.categoryIndex = 0
    vm.skillIndex = 0
    vm.displaySection = {}
    vm.sampleSkills = [
      {'tagName':'Photoshop','hidden':false,'score':0,'sources':[], 'tagId': 302},
      {'tagName':'Sketch','hidden':false,'score':0,'sources':[], 'tagId': 351},
      {'tagName':'HTML5','hidden':false,'score':0,'sources':[], 'tagId': 213}
    ]

    activate()

    function activate() {
      var _userId = profileVm.isUser ? UserService.getUserIdentity().userId : false
      // retrieve web links & external accounts
      var _linksPromises = [
        ExternalAccountService.getAllExternalLinks(profileVm.userHandle, _userId, !!_userId),
        ExternalWebLinksService.getLinks(profileVm.userHandle, !!_userId)
      ]
      $q.all(_linksPromises).then(function(data) {
        vm.linkedExternalAccounts = data[0].concat(data[1])
        vm.displaySection.externalLinks = profileVm.showEditProfileLink || !!vm.linkedExternalAccounts.length

        profileVm.status.externalLinks = CONSTANTS.STATE_READY
      }).catch(function(resp) {
        profileVm.status.externalLinks = CONSTANTS.STATE_ERROR
      })

      profileVm.statsPromise.then(function() {
        vm.categories = profileVm.categories
        vm.marathonRating = profileVm.categories['MARATHON_MATCH'] && profileVm.categories['MARATHON_MATCH'].rating
        vm.SRMRating = profileVm.categories['SRM'] && profileVm.categories['SRM'].rating
        vm.displaySection.stats = profileVm.showEditProfileLink
      })

      profileVm.skillsPromise.then(function() {
        // show section if user is viewing his/her own profile OR if we have data
        vm.fullSkills = profileVm.skills
        vm.someSkills = profileVm.skills.slice(0, 10)
        vm.skills = vm.someSkills
        vm.displaySection.skills = profileVm.showEditProfileLink || !!vm.skills.length
      })
    }
  }
})()
