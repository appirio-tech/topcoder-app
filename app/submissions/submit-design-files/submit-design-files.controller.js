import angular from 'angular'
import _ from 'lodash'

(function () {
  'use strict'

  angular.module('tc.submissions').controller('SubmitDesignFilesController', SubmitDesignFilesController)

  SubmitDesignFilesController.$inject = ['$scope','$window', '$stateParams', 'logger', 'UserService', 'SubmissionsService', 'challengeToSubmitTo']

  function SubmitDesignFilesController($scope, $window, $stateParams, logger, UserService, SubmissionsService, challengeToSubmitTo) {
    if (!challengeToSubmitTo.challenge) { return }

    var vm = this
    vm.urlRegEx = new RegExp(/^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/)
    vm.rankRegEx = new RegExp(/^[1-9]\d*$/)
    vm.comments = ''
    vm.uploadProgress = 0
    vm.preparing = false
    vm.finishing = false
    vm.finished = false
    vm.showProgress = false
    vm.errorInUpload = false
    vm.formFonts = {}
    vm.formStockarts = {}
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
    }

    var userId = parseInt(UserService.getUserIdentity().userId)

    vm.submissionsBody = {
      reference: {
        type: 'CHALLENGE',
        id: $stateParams.challengeId,
        phaseType: challengeToSubmitTo.phaseType,
        phaseId: challengeToSubmitTo.phaseId
      },
      userId: userId,
      data: {
        method: 'DESIGN_CHALLENGE_FILE_PICKER_ZIP_FILE',
        files: [],
        submitterRank: 1,
        submitterComments: '',
        fonts: [],
        stockArts: []
      }
    }

    vm.setRankTo1 = setRankTo1
    vm.setFileReference = setFileReference
    vm.uploadSubmission = uploadSubmission
    vm.refreshPage = refreshPage
    vm.cancelRetry = cancelRetry

    activate()

    function activate() {}

    function setRankTo1(inputValue) {
      // If a user leaves the rank input blank, set it to 1
      if (inputValue === '') {
        return 1
      }
      return inputValue
    }

    function setFileReference(file, fieldId) {
      var fileObject = null
      if (file) {
        fileObject = {
          name: file.name,
          type: fieldId,
          status: 'STAGED',
          stagedFileContainer: file.container,
          stagedFilePath: file.path,
          size: file.size,
          mediaType: file.mimetype
        }
      }

      // If user changes a file input's file, update the file details
      var isFound = vm.submissionsBody.data.files.reduce(function(isFound, file, i, filesArray) {
        if (isFound) { return true }

        if (file && file.type === fieldId) {
          // when file is removed, it would set correspding file as null
          filesArray[i] = fileObject
          return true
        }

        return false
      }, false)

      // Add new files to the list
      if (!isFound && fileObject) {
        vm.submissionsBody.data.files.push(fileObject)
      }
    }

    function uploadSubmission() {
      vm.errorInUpload = false
      vm.uploadProgress = 0
      vm.showProgress = true
      vm.preparing = true
      vm.finishing = false
      vm.finished = false
      vm.submissionsBody.data.submitterComments = vm.comments
      vm.submissionsBody.data.submitterRank = vm.submissionForm.submitterRank

      // Process stock art
      var processedStockarts = _.reduce(vm.formStockarts, function(compiledStockarts, formStockart) {
        if (formStockart.sourceUrl) {
          delete formStockart.id

          compiledStockarts.push(formStockart)
        }

        return compiledStockarts
      }, [])

      vm.submissionsBody.data.stockArts = processedStockarts

      // Process fonts
      var processedFonts = _.reduce(vm.formFonts, function(compiledFonts, formFont) {
        if (formFont.source) {
          delete formFont.id
          delete formFont.isFontUrlRequired
          delete formFont.isFontUrlDisabled
          delete formFont.isFontNameRequired
          delete formFont.isFontNameDisabled
          delete formFont.isFontSourceRequired

          compiledFonts.push(formFont)
        }

        return compiledFonts
      }, [])

      vm.submissionsBody.data.fonts = processedFonts
      SubmissionsService.startSubmission(vm.submissionsBody, updateProgress)
      .then(function(processedSubmission) {
        logger.debug('Processed Submission: ', processedSubmission)
      })
      .catch(function(err) {
        logger.error('Submission processing failed ', err)
        // TODO handle error
      })
    }

    // Callback for updating submission upload process. It looks for different phases e.g. PREPARE, UPLOAD, FINISH
    // of the submission upload and updates the progress UI accordingly.
    function updateProgress(phase, args) {
      // for PREPARE phase
      if (phase === 'PREPARE') {
        // we are concerned only for completion of the phase
        if (args === 100) {
          vm.preparing = false
          vm.finishing = true
          logger.debug('Prepared for upload.')
        }
      } else if (phase === 'FINISH') {
        // we are concerned only for completion of the phase
        if (args === 100) {
          logger.debug('Finished upload.')
          vm.preparing = false
          vm.finishing = false
          vm.finished = true
        }
      } else {
        // assume it to be error condition
        logger.debug('Error Condition: ' + phase)
        vm.errorInUpload = true
      }
    }

    function refreshPage() {
      $window.location.reload(true)
    }

    function cancelRetry() {
      vm.showProgress = false
    }
  }
})()
