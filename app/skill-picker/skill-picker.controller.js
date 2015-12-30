(function() {
  'use strict';

  angular.module('tc.skill-picker').controller('SkillPickerController', SkillPickerController);

  SkillPickerController.$inject = ['$scope', 'CONSTANTS', 'ProfileService', '$state', 'userProfile', 'featuredSkills', '$log', 'toaster', 'MemberCertService', '$q'];

  function SkillPickerController($scope, CONSTANTS, ProfileService, $state, userProfile, featuredSkills, $log, toaster, MemberCertService, $q) {
    var vm = this;
    $log = $log.getInstance("SkillPickerController");
    vm.ASSET_PREFIX = CONSTANTS.ASSET_PREFIX;
    vm.IOS_PROGRAM_ID = CONSTANTS.SWIFT_PROGRAM_ID;
    vm.submitSkills = submitSkills;
    vm.featuredSkills = featuredSkills;
    vm.userId = userProfile.userId;
    vm.username = userProfile.handle;
    vm.toggleSkill = toggleSkill;
    vm.tracks = {};
    vm.mySkills = [];
    vm.disableDoneButton = false;
    vm.showCommunity = false;
    vm.loadingCommunities = false;
    vm.communities = {};
    vm.isPageDirty = isPageDirty;
    vm.isTracksDirty = isTracksDirty;
    ///////
    activate();

    /**
     * Activates the controller.
     */
    function activate() {
      $log.debug("init");
      initCommunities();
      checkCommunityStatus();
    }

    /**
     * Verfies if the page state has been modified by the user in any way.
     */
    function isPageDirty() {
      return isTracksDirty() || isCommunitiesDirty();
    }

    /**
     * Verfies if the tracks section state has been modified by the user in any way.
     */
    function isTracksDirty() {
      return vm.tracks.DESIGN || vm.tracks.DEVELOP || vm.tracks.DATA_SCIENCE;
    }

    /**
     * Verfies if the communities section state has been modified by the user in any way.
     */
    function isCommunitiesDirty() {
      var community = _.findWhere(vm.communities, {dirty: true});
      return !!community;
    }

    /**
     * Initializes the communities to show in the communities section.
     */
    function initCommunities() {
      vm.communities['ios'] = { displayName: 'iOS', programId: vm.IOS_PROGRAM_ID, status: false, dirty: false, display: true};
      _addWatchToCommunity(vm.communities['ios']);
    }

    /**
     * Helper method to add watch to given object.
     */
    function _addWatchToCommunity(community) {
      community.unregister = $scope.$watch(
        function() { return community; },
        function(newValue, oldValue) {
          if (oldValue && newValue.status !== oldValue.status) {
            newValue.dirty = oldValue.dirty ? false : true;
          }
        },
        true
      );
    }

    /**
     * Checks registration status of each community and updates the state of each community.
     */
    function checkCommunityStatus() {
      var promises = [];
      for (var name in vm.communities) {
        var community = vm.communities[name];
        promises.push(MemberCertService.getMemberRegistration(vm.userId, community.programId));
      }
      vm.loadingCommunities = true;
      $q.all(promises).then(function(responses) {
         vm.loadingCommunities = false;
         responses.forEach(function(program) {
          if (program) {
            var community = _.findWhere(vm.communities, {programId: program.eventId});
            if (community) {
              // set display false to avoid showing already enabled/registered program
              // we expect display property to be modified after first load  of the page
              community.display = false;
              community.status = true;
              if (community.unregister){
                community.unregister();
                _addWatchToCommunity(community);
              }
            }
          }
        });
        // if there exists at least 1 community which can be displayed, set showCommunity flag to true
        var community = _.findWhere(vm.communities, {display: true});
        if (community) {
          vm.showCommunity = true;
        }
      })
      .catch(function(error) {
        vm.loadingCommunities = false;
      });
    }

    /**
     * Toggles the given skill for the user. If it is not added, adds it and if already added, removes it.
     */
    function toggleSkill(tagId) {
      var _idx = vm.mySkills.indexOf(tagId.toString());
      if (_idx > -1) {
        // remove
        vm.mySkills.splice(_idx, 1);
      } else {
        // add
        vm.mySkills.push(tagId.toString());
      }
    }

    /**
     * Persists the user's altered information.
     */
    function submitSkills() {

      vm.saving = true;

      var promises = [];
      if (isTracksDirty()) {
        // save tracks
        userProfile.tracks = _.reduce(vm.tracks, function(result, isInterested, trackName) {
          if (isInterested) {
            result.push(trackName);
          }
          return result;
        }, []);
        promises.push(userProfile.save());
      }
      if (vm.mySkills.length > 0) {
        // save skills
        var data = {};
        for (var i = 0; i < vm.mySkills.length; i++) {
          data[vm.mySkills[i]] = {
            hidden: false
          };
        }
        promises.push(ProfileService.updateUserSkills(vm.username, data));
      }
      $log.debug('isCommunitiesDirty: ' + isCommunitiesDirty());
      if (isCommunitiesDirty()) {
        for(var communityName in vm.communities) {
          var community = vm.communities[communityName];
          if (community.dirty === true) {
            if (community.status === true) {
              promises.push(MemberCertService.registerMember(vm.userId, community.programId));
            }
          }
        }
      }

      $q.all(promises).then(function(responses) {
        vm.saving = false;
        toaster.pop('success', "Success!", "Your skills have been updated.");
        vm.disableDoneButton = true;
        $state.go('dashboard');
      })
      .catch(function(resp) {
        vm.saving = false;
        toaster.pop('error', "Whoops!", "Something went wrong. Please try again later.");
      });
    }
  }
})();
