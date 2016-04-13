import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.submissions').controller('SubmitDevelopFilesController', SubmitDevelopFilesController)

  SubmitDevelopFilesController.$inject = ['$scope','$window', '$stateParams', 'logger', 'UserService', 'SubmissionsService', 'challengeToSubmitTo']

  function SubmitDevelopFilesController($scope, $window, $stateParams, logger, UserService, SubmissionsService, challengeToSubmitTo) {
    if (!challengeToSubmitTo.challenge) { return }

    var vm = this
    var files = {}
    var fileUploadProgress = {}
    vm.comments = ''
    vm.uploadProgress = 0
    vm.uploading = false
    vm.preparing = false
    vm.finishing = false
    vm.showProgress = false
    vm.errorInUpload = false
    vm.submissionForm = {
      files: [],

      // use develop name
      sourceZip: null,

      submitterComments: '',
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
        method: challengeToSubmitTo.challenge.track.toUpperCase() + '_CHALLENGE_ZIP_FILE',

        // Can delete below since they are processed and added later?
        files: [],
        submitterComments: ''
      }
    }

    vm.setFileReference = setFileReference
    vm.uploadSubmission = uploadSubmission
    vm.refreshPage = refreshPage
    vm.cancelRetry = cancelRetry

    activate()

    function activate() {}

    function setFileReference(file, fieldId) {
      // Can clean up since fileValue on tcFileInput has file reference?
      files[fieldId] = file

      var fileObject = {
        name: file.name,
        type: fieldId,
        status: 'PENDING'
      }

      // TODO: Refactor or develop
      switch(fieldId) {
      case 'SUBMISSION_ZIP':
        fileObject.mediaType = 'application/octet-stream'
        break
      case 'SOURCE_ZIP':
        fileObject.mediaType = 'application/octet-stream'
        break
      default:
        fileObject.mediaType = file.type
      }

      // If user changes a file input's file, update the file details
      var isFound = vm.submissionsBody.data.files.reduce(function(isFound, file, i, filesArray) {
        if (isFound) { return true }

        if (file.type === fileObject.type) {
          filesArray[i] = fileObject
          return true
        }

        return false
      }, false)

      // Add new files to the list
      if (!isFound) {
        vm.submissionsBody.data.files.push(fileObject)
      }
    }

    function uploadSubmission() {
      vm.errorInUpload = false
      vm.uploadProgress = 0
      vm.fileUploadProgress = {}
      vm.showProgress = true
      vm.preparing = true
      vm.uploading = false
      vm.finishing = false
      vm.submissionsBody.data.submitterComments = vm.comments

      logger.debug('Body for request: ', vm.submissionsBody)
      SubmissionsService.getPresignedURL(vm.submissionsBody, files, updateProgress)
    }

    // Callback for updating submission upload process. It looks for different phases e.g. PREPARE, UPLOAD, FINISH
    // of the submission upload and updates the progress UI accordingly.
    function updateProgress(phase, args) {
      // for PREPARE phase
      if (phase === 'PREPARE') {
        // we are concerned only for completion of the phase
        if (args === 100) {
          vm.preparing = false
          vm.uploading = true
          logger.debug('Prepared for upload.')
        }
      } else if (phase === 'UPLOAD') {
        // if args is object, this update is about XHRRequest's upload progress
        if (typeof args === 'object') {
          var requestId = args.file
          var progress = args.progress
          if (!fileUploadProgress[requestId] || fileUploadProgress[requestId] < progress) {
            fileUploadProgress[requestId] = progress
          }
          var total = 0, count = 0
          for(var requestIdKey in fileUploadProgress) {
            var prog = fileUploadProgress[requestIdKey]
            total += prog
            count++
          }
          vm.uploadProgress = total / count

          // initiate digest cycle because this event (xhr event) is caused outside angular
          $scope.$apply()
        } else { // typeof args === 'number', mainly used a s fallback to mark completion of the UPLOAD phase
          vm.uploadProgress = args
        }

        // start next phase when UPLOAD is done
        if (vm.uploadProgress == 100) {
          logger.debug('Uploaded files.')
          vm.uploading = false
          vm.finishing = true
        }
      } else if (phase === 'FINISH') {
        // we are concerned only for completion of the phase
        if (args === 100) {
          logger.debug('Finished upload.')
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
