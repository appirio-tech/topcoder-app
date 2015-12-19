(function () {
  'use strict';

  angular.module('tc.submissions').controller('SubmitFileController', SubmitFileController);

  SubmitFileController.$inject = ['$stateParams', 'UserService', 'SubmissionsService'];

  function SubmitFileController($stateParams, UserService, SubmissionsService) {
    var vm = this;
    vm.hasAgreedToTerms = false;
    vm.comments = 'test';
    var userId = parseInt(UserService.getUserIdentity().userId);

    vm.submissionsBody = {
      reference: {

        // type dynamic or static?
        type: 'CHALLENGE',
        id: $stateParams.challengeId,

        // Current phase check should come from challenge API?
        phase: 'SUBMISSION'

      },
      userId: userId,
      data: {

        // Dynamic or static?
        method: 'DESIGN_CHALLENGE_ZIP_FILE',
        files: [],
        fonts: [],
        submitterRank: 1,
        artWork: [],
        submitterComments: vm.comments,
      }
    };

    vm.setFileReference = setFileReference;
    vm.uploadSubmission = uploadSubmission;


    activate();

    function activate() {

    }

    function setFileReference(file, fieldType) {
      var fileObject = {
        name: file.name,
        type: file.type
      };

      switch(fieldType) {
        case 'SUBMISSION_ZIP':
          fileObject.mediaType = 'application/octet-stream';
          break;
        case 'SOURCE_ZIP':
          fileObject.mediaType = 'application/octet-stream';
          break;
        default:
          fileObject.mediaType = file.type;
      }

      // If user picks a new file, replace the fileObject with the new one
      // Or add it the list if it's not there
      vm.submissionsBody.data.files.some(function(file, i, filesArray) {
        if (file.type === fileObject.type) {
          f = fileObject;
        } else if (filesArray.length === i + 1) {
          filesArray.push(fileObject);
        }
      });
    }

    function uploadSubmission() {
      SubmissionsService.getPresignedURL(vm.submissionsBody);
    }
  }
})();
