(function () {
  'use strict';

  angular.module('tc.skill-picker').controller('SkillPickerController', SkillPickerController);

  SkillPickerController.$inject = [];

  function SkillPickerController() {
    var vm = this;
    vm.toggleSkill = toggleSkill;
    vm.selectTrack = selectTrack;

    activate();

    function activate() {
      vm.tracks = {
        design: false,
        develop: false,
        data_science: false
      };

      vm.skills = {
        design: ['Photoshop', 'Illustrator', 'InDesign', 'UX', 'UI', 'Sketch'],
        develop: ['Java', 'JavaScript', 'Ruby', 'Objective C', 'Python', 'SASS', 'HTML', 'CSS', 'LESS', 'C#', 'iOS', 'C++', 'Xcode', '.NET', 'PHP', 'MySQL', 'MongoDB'],
        data_science: ['Java', 'Algorithms', 'Ruby', 'Objective C', 'Python', 'SASS', 'HTML', 'CSS', 'LESS', 'C#', 'iOS', 'C++', 'Xcode', '.NET', 'PHP', 'MySQL', 'MongoDB']
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
      var selectedSkill = vm.selectedSkills[track][skill];
      if (!selectedSkill) {
        selectedSkill = true;
        vm.selectedSkills[track].numSkills += 1;

      } else {
        selectedSkill = false;
        vm.selectedSkills[track].numSkills -= 1;
      }
    }

    function selectTrack(track) {
      if (vm.tracks[track] === vm.dropdown[track]) {
        vm.dropdown[track] = !vm.dropdown[track];
      }

      vm.tracks[track] = !vm.tracks[track];
    }
  }
})();
