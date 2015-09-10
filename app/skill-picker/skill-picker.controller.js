(function () {
  'use strict';

  angular.module('tc.skill-picker').controller('SkillPickerController', SkillPickerController);

  SkillPickerController.$inject = ['ProfileService', '$state', 'TagsService', '$log'];

  function SkillPickerController(ProfileService, $state, TagsService, $log) {
    var vm = this;
    vm.toggleSkill = toggleSkill;
    vm.selectTrack = selectTrack;
    vm.submitSkills = submitSkills;

    activate();

    function activate() {
      TagsService.getTags()
      .then(function(res) {
        // console.log('tags: ', res);
      })
      .catch(function(err) {
        $log.error(err);
      });

      vm.noTrackSelected = true;

      vm.tracks = {
        design: false,
        develop: false,
        data_science: false
      };

      vm.skills = {
        design: ['Photoshop', 'Illustrator', 'InDesign', 'UX', 'UI', 'Sketch'],
        develop: ['Java', 'JavaScript', 'Ruby', 'Objective C', 'Python', 'SASS', 'HTML', 'CSS', 'LESS', 'C#', 'iOS', 'C++', 'PHP', 'MySQL', 'MongoDB'],
        data_science: ['Java', 'Algorithms', 'Ruby', 'Objective C', 'Python', 'SASS', 'HTML', 'CSS', 'LESS', 'C#', 'iOS', 'C++', 'PHP', 'MySQL', 'MongoDB']
      };

      vm.selectedSkills = {
        design: {numSkills: 0},
        develop: {numSkills: 0},
        data_science: {numSkills: 0}
      };

      vm.dropdown = {
        design: false,
        develop: false,
        data_science: false
      };
    }

    function toggleSkill(track, skill) {
      var track = vm.selectedSkills[track];

      if (!track[skill]) {
        track[skill] = true;
        track.numSkills += 1;

      } else {
        track[skill] = false;
        track.numSkills -= 1;
      }
    }

    function selectTrack(track) {
      if (vm.tracks[track] === vm.dropdown[track]) {
        vm.dropdown[track] = !vm.dropdown[track];
      }

      vm.tracks[track] = !vm.tracks[track];
    }

    function submitSkills() {
      ProfileService.updateUserSkills({id: 247, "hidden": false})
      .then(function(res) {
        $log.info("res: ");
        $log.info(res);
        // $state.go('dashboard');
      })
      .catch(function(err) {
        $log.error(err);
      });
    }
  }
})();
