(function () {
  'use strict';

  angular.module('tc.skill-picker').controller('SkillPickerController', SkillPickerController);

  SkillPickerController.$inject = ['ProfileService', '$state', 'userProfile', 'featuredSkills', '$log', 'toaster'];

  function SkillPickerController(ProfileService, $state, userProfile, featuredSkills, $log, toaster) {
    var vm = this;
    $log = $log.getInstance("SkillPickerController");

    vm.selectTrack = selectTrack;
    vm.submitSkills = submitSkills;
    vm.featuredSkills = featuredSkills;
    vm.username = userProfile.handle;
    vm.mySkills = [];
    ///////
    activate();

    function activate() {
      $log.debug("init")
      vm.noTrackSelected = true;

      vm.tracks = {
        design: true,
        develop: true,
        dataScience: true
      };

      vm.toggleSkill = function(tagId) {
        var _idx = vm.mySkills.indexOf(tagId.toString());
        if (_idx > -1) {
          // remove
          vm.mySkills.splice(_idx, 1);
        } else {
          // add
          vm.mySkills.push(tagId.toString());
        }
      }
    }

    function selectTrack(track) {
      vm.tracks[track] = !vm.tracks[track];
    }

    function submitSkills() {
      if (vm.mySkills.length > 0) {
        // save skills
        var data = {};
        for(var i=0;i<vm.mySkills.length;i++) {
          data[vm.mySkills[i]] = {hidden: false};
        }
        ProfileService.updateUserSkills(vm.username, data)
        .then(function(resp) {
          toaster.pop('success', "Success!", "Your skills have been updated.");
          $state.go('dashboard');
        })
        .catch(function(data) {
          toaster.pop('error', "Whoops", "Something went wrong. Please try again later.");
        })

      }
    }
  }
})();
