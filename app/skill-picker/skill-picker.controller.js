(function() {
  'use strict';

  angular.module('tc.skill-picker').controller('SkillPickerController', SkillPickerController);

  SkillPickerController.$inject = ['CONSTANTS', 'ProfileService', '$state', 'userProfile', 'featuredSkills', '$log', 'toaster'];

  function SkillPickerController(CONSTANTS, ProfileService, $state, userProfile, featuredSkills, $log, toaster) {
    var vm = this;
    $log = $log.getInstance("SkillPickerController");
    vm.ASSET_PREFIX = CONSTANTS.ASSET_PREFIX;
    vm.submitSkills = submitSkills;
    vm.featuredSkills = featuredSkills;
    vm.username = userProfile.handle;
    vm.toggleSkill = toggleSkill;
    vm.tracks = {};
    vm.mySkills = [];
    ///////
    activate();

    function activate() {
      $log.debug("init")
    }

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

    function submitSkills() {

      vm.saving = true;
      // save tracks
      userProfile.tracks = _.reduce(vm.tracks, function(result, isInterested, trackName) {
        if (isInterested) {
          result.push(trackName);
        }
        return result;
      }, []);

      userProfile.save().then(function(data) {
          if (vm.mySkills.length > 0) {
            // save skills
            var data = {};
            for (var i = 0; i < vm.mySkills.length; i++) {
              data[vm.mySkills[i]] = {
                hidden: false
              };
            }
            ProfileService.updateUserSkills(vm.username, data)
              .then(function(resp) {
                vm.saving = false;
                toaster.pop('success', "Success!", "Your skills have been updated.");
                $state.go('dashboard');
              })
              .catch(function(data) {
                vm.saving = false;
                toaster.pop('error', "Whoops", "Something went wrong. Please try again later.");
              })
          } else {
            vm.saving = false;
            toaster.pop('success', "Success!", "Your skills have been updated.");
            $state.go('dashboard');
          }

        })
        .catch(function(resp) {
          vm.saving = false;
          toaster.pop('error', "Whoops", "Something went wrong. Please try again later.");
        })

    }
  }
})();
