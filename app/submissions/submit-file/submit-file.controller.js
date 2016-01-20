(function () {
  'use strict';

  angular.module('tc.submissions').controller('SubmitFileController', SubmitFileController);

  SubmitFileController.$inject = ['$scope','$state', '$stateParams', '$log', 'UserService', 'SubmissionsService', 'challengeToSubmitTo'];

  function SubmitFileController($scope, $state, $stateParams, $log, UserService, SubmissionsService, challengeToSubmitTo) {
    var vm = this;
    $log = $log.getInstance('SubmitFileController');
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
    vm.formFonts = {};
    vm.formStockarts = {};
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

      // If user changes a file input's file, update the file details
      var isFound = vm.submissionsBody.data.files.reduce(function(isFound, file, i, filesArray) {
        if (isFound) { return true; }

        if (file.type === fileObject.type) {
          filesArray[i] = fileObject;
          return true;
        }

        return false;
      }, false);

      // Add new files to the list
      if (!isFound) {
        vm.submissionsBody.data.files.push(fileObject);
      }
    }

    function uploadSubmission() {
      vm.errorInUpload = false;
      vm.uploadProgress = 0;
      vm.fileUploadProgress = {};
      vm.showProgress = true;
      vm.preparing = true;
      vm.uploading = false;
      vm.finishing = false;
      vm.submissionsBody.data.submitterComments = vm.comments;
      vm.submissionsBody.data.submitterRank = vm.submissionForm.submitterRank;

      // Process stock art
      var processedStockarts = _.reduce(vm.formStockarts, function(compiledStockarts, formStockart) {
        if (formStockart.description) {
          delete formStockart.id;
          delete formStockart.isPhotoDescriptionRequired;
          delete formStockart.isPhotoURLRequired;
          delete formStockart.isFileNumberRequired;

          compiledStockarts.push(formStockart);
        }

        return compiledStockarts;
      }, []);

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

      $log.debug('Body for request: ', vm.submissionsBody);
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
          $log.debug('Prepared for upload.');
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
          $log.debug('Uploaded files.');
          vm.uploading = false;
          vm.finishing = true;
        }
      } else if (phase === 'FINISH') {
        // we are concerned only for completion of the phase
        if (args === 100) {
          $log.debug('Finished upload.');
          vm.finishing = false;
          vm.showProgress = false;

          $state.go('submissions.completed');
        }
      } else { // assume it to be error condition
        $log.debug("Error Condition: " + phase);
        vm.errorInUpload = true;
      }
    }

    function cancelRetry() {
      vm.showProgress = false;
      // TODO redirect to submission listing / challenge details page
    }
  }
})();
