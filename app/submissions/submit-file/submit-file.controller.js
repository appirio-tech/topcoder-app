(function () {
  'use strict';

  angular.module('tc.submissions').controller('SubmitFileController', SubmitFileController);

  SubmitFileController.$inject = ['$scope', '$stateParams', 'UserService', 'SubmissionsService', 'challengeToSubmitTo'];

  function SubmitFileController($scope, $stateParams, UserService, SubmissionsService, challengeToSubmitTo) {
    var vm = this;
    var files = {};
    var fileUploadProgress = {};
    vm.urlRegEx = new RegExp(/^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/);
    vm.rankRegEx = new RegExp(/^[1-9]\d*$/);
    vm.comments = '';
    vm.uploadProgress = 0;
    vm.uploading = false;
    vm.preparing = false;
    vm.finishing = false;
    vm.showProgress = false;
    vm.errorInUpload = false;
    vm.formFonts = {
      0: {
        id: 0,
        source: '',
        name: '',
        sourceUrl: '',
        isFontUrlRequired: false,
        isFontUrlDisabled: true,
        isFontNameRequired: false,
        isFontNameDisabled: true,
        isFontSourceRequired: false
      }
    };
    vm.formStockarts = {
      0: {
        id: 1,
        description: '',
        sourceUrl: '',
        fileNumber: ''
      }
    };
    vm.submissionForm = {
      files: [],

      submissionZip: null,
      sourceZip: null,
      designCover: null,

      submitterRank: 1,
      submitterComments: '',
      fonts: [],
      stockArts: [],
      hasAgreedToTerms: false
    };

    var userId = parseInt(UserService.getUserIdentity().userId);

    vm.submissionsBody = {
      reference: {

        // type dynamic or static?
        type: 'CHALLENGE',
        id: $stateParams.challengeId,
        phaseType: challengeToSubmitTo.phaseType,
        phaseId: challengeToSubmitTo.phaseId
      },
      userId: userId,
      data: {

        // Dynamic or static?
        method: 'DESIGN_CHALLENGE_ZIP_FILE',

        // Can delete below since they are processed and added later?
        files: [],
        submitterRank: 1,
        submitterComments: '',
        fonts: [],
        stockArts: []
      }
    };

    vm.setRankTo1 = setRankTo1;
    vm.setFileReference = setFileReference;
    vm.uploadSubmission = uploadSubmission;
    vm.cancelRetry = cancelRetry;

    activate();

    function activate() {}

    function setRankTo1(inputValue) {
      // If a user leaves the rank input blank, set it to 1
      if (inputValue === '') {
        return 1;
      }
      return inputValue;
    }

    function setFileReference(file, fieldId) {
      // Can clean up since fileValue on tcFileInput has file reference?
      files[fieldId] = file;

      var fileObject = {
        name: file.name,
        type: fieldId,
        status: 'PENDING'
      };

      switch(fieldId) {
        case 'SUBMISSION_ZIP':
          fileObject.mediaType = 'application/octet-stream';
          break;
        case 'SOURCE_ZIP':
          fileObject.mediaType = 'application/octet-stream';
          break;
        default:
          fileObject.mediaType = file.type;
      }

      // If user picks a new file, replace the that file's fileObject with a new one
      // Or add it the list if it's not there
      if (vm.submissionsBody.data.files.length) {
        vm.submissionsBody.data.files.some(function(file, i, filesArray) {
          if (file.type === fileObject.type) {
            file = fileObject;
          } else if (filesArray.length === i + 1) {
            filesArray.push(fileObject);
          }
        });
      } else {
        vm.submissionsBody.data.files.push(fileObject);
      }
    }

    function uploadSubmission() {
      vm.errorInUpload = false;
      vm.uploadProgress = 0;
      vm.fileUploadProgress = {};
      vm.showProgress = true;
      vm.preparing = true;
      vm.submissionsBody.data.submitterComments = vm.comments;
      vm.submissionsBody.data.submitterRank = vm.submissionForm.submitterRank;

      // Process stock art
      var processedStockarts = _.map(vm.formStockarts, function(formStockart) {
          delete formStockart.id;
          return formStockart;
      });

      vm.submissionsBody.data.stockArts = processedStockarts;

      // Process fonts
      var processedFonts = _.reduce(vm.formFonts, function(compiledFonts, formFont) {
        if (formFont.source) {
          delete formFont.id;
          delete formFont.isFontUrlRequired;
          delete formFont.isFontUrlDisabled;
          delete formFont.isFontNameRequired;
          delete formFont.isFontNameDisabled;
          delete formFont.isFontSourceRequired;
          compiledFonts.push(formFont);
        }

        return compiledFonts;
      }, []);

      vm.submissionsBody.data.fonts = processedFonts;

      console.log('Body for request: ', vm.submissionsBody);
      return;
      SubmissionsService.getPresignedURL(vm.submissionsBody, files, updateProgress);
    }

    /*
     * Callback for updating submission upload process. It looks for different phases e.g. PREPARE, UPLOAD, FINISH
     * of the submission upload and updates the progress UI accordingly.
     */
    function updateProgress(phase, args) {
      // for PREPARE phase
      if (phase === 'PREPARE') {
        // we are concerned only for completion of the phase
        if (args === 100) {
          vm.preparing = false;
          vm.uploading = true;
          console.log('Prepared');
        }
      } else if (phase === 'UPLOAD') {
        // if args is object, this update is about XHRRequest's upload progress
        if (typeof args === 'object') {
          var requestId = args.file;
          var progress = args.progress;
          if (!fileUploadProgress[requestId] || fileUploadProgress[requestId] < progress) {
            fileUploadProgress[requestId] = progress;
          }
          var total = 0, count = 0;
          for(var requestId in fileUploadProgress) {
            var prog = fileUploadProgress[requestId];
            total += prog;
            count++;
          }
          vm.uploadProgress = total / count;
          // initiate digest cycle because this event (xhr event) is caused outside angular
          $scope.$apply();
        } else { // typeof args === 'number', mainly used a s fallback to mark completion of the UPLOAD phase
          vm.uploadProgress = args;
        }
        // start next phase when UPLOAD is done
        if (vm.uploadProgress == 100) {
          console.log('Uploaded');
          vm.uploading = false;
          vm.finishing = true;
        }
      } else if (phase === 'FINISH') {
        // we are concerned only for completion of the phase
        if (args === 100) {
          console.log('Finished');
          vm.finishing = false;
          vm.showProgress = false;

          // TODO redirect to submission listing / challenge details page
        }
      } else { // assume it to be error condition
        console.log("Else: " + phase);
        vm.errorInUpload = true;
      }
    }

    function cancelRetry() {
      vm.showProgress = false;
      // TODO redirect to submission listing / challenge details page
    }
  }
})();
