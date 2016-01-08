(function () {
  'use strict';

  angular.module('tc.submissions').controller('SubmitFileController', SubmitFileController);

  SubmitFileController.$inject = ['$stateParams', 'UserService', 'SubmissionsService', 'challengeToSubmitTo'];

  function SubmitFileController($stateParams, UserService, SubmissionsService, challengeToSubmitTo) {
    var vm = this;
    var files = {};
    vm.urlRegEx = new RegExp(/^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/);
    vm.rankRegEx = new RegExp(/^[1-9]\d*$/);
    vm.comments = '';
    vm.formFonts = [{
      id: 0,
      source: '',
      name: '',
      sourceUrl: '',
      isFontUrlRequired: false,
      isFontUrlDisabled: true,
      isFontNameRequired: false,
      isFontNameDisabled: true,
      isFontSourceRequired: false
    }];
    vm.submissionForm = {
      files: [],

      submissionZip: null,
      sourceZip: null,
      designCover: null,

      submitterRank: 1,
      submitterComments: '',
      fonts: [],
      stockArts: [{
        id: 1,
        description: '',
        sourceUrl: '',
        fileNumber: ''
      }],
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
    vm.createAnotherStockArtFieldset = createAnotherStockArtFieldset;

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

    function createAnotherStockArtFieldset() {
      vm.submissionForm.stockArts.push({
        id: vm.submissionForm.stockArts.length + 1,
        description: '',
        sourceUrl: '',
        fileNumber: ''
      });
    }

    function uploadSubmission() {
      vm.submissionsBody.data.submitterComments = vm.comments;
      vm.submissionsBody.data.submitterRank = vm.submissionForm.submitterRank;

      // Process stock art
      if (vm.submissionForm.stockArts[0].description === '') {
        vm.submissionsBody.data.stockArts = [];
      } else {
        var stockArts = angular.copy(vm.submissionForm.stockArts);
        vm.submissionsBody.data.stockArts = stockArts.map(function(stockArt) {
          delete stockArt.id;
          return stockArt;
        });
      }

      // Process fonts
      if (vm.formFonts[0].source === '') {
        vm.submissionsBody.data.fonts = [];
      } else {
        var fonts = angular.copy(vm.formFonts);
        vm.submissionsBody.data.fonts = fonts.map(function(font) {
          if (font.source) {
            delete font.id;
            delete font.isFontUrlRequired;
            delete font.isFontUrlDisabled;
            delete font.isFontNameRequired;
            delete font.isFontNameDisabled;
            delete font.isFontSourceRequired;
            return font;
          }
        });
      }

      console.log('Body for request: ', vm.submissionsBody);
      SubmissionsService.getPresignedURL(vm.submissionsBody, files);
    }
  }
})();
