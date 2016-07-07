import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('tcFpFileInput', ['$rootScope', 'CONSTANTS', 'logger', 'UserService', 'filepickerService', tcFPFileInput])

  function tcFPFileInput($rootScope, CONSTANTS, logger, UserService, filepickerService) {
    return {
      restrict: 'E',
      require: '^form',
      template: require('./tc-fp-file-input')(),
      scope: {
        labelText: '@',
        fieldId: '@',
        placeholder: '@',
        fileType: '@',
        showFileType: '=',
        mandatory: '=',
        maxFileSize: '@',
        fpServices: '@',
        buttonText: '@',
        setFileReference: '&',
        ngModel: '='
      },
      link: function(scope, element, attrs, formController) {
        // set filePath
        var userId = parseInt(UserService.getUserIdentity().userId)
        scope.filePath = scope.fieldId + '/'
        if (scope.fieldId.indexOf('ZIP') > -1) {
          scope.filePath += _.join([userId, scope.fieldId, (new Date()).valueOf()], '-') + '.zip'
        }
        var dragAreaClasses = 'tc-fp-file-drag-drop'
        var dragText = ''
        // set mimeTypes
        if (scope.fieldId.indexOf('ZIP') > -1) {
          scope.mimeTypes = 'application/zip'
          dragText = 'Drag and drop your .zip file here (500MB max)'
        } else if (scope.fieldId.indexOf('DESIGN_COVER') > -1) {
          scope.mimeTypes = 'image/png,image/jpeg,image/bmp'
          dragAreaClasses += ' tc-fp-file-drag-drop-image'
          dragText = 'Drag and Drop your PNG or JPG file here'
        }

        // set default services
        scope.fpServices = scope.fpServices || 'COMPUTER,GOOGLE_DRIVE,BOX,DROPBOX'
        scope.fpContainer = CONSTANTS.FILE_PICKER_SUBMISSION_CONTAINER_NAME || 'submission-staging-dev'

        // set max size
        scope.maxSize = 500 * 1024 * 1024

        /*
         *pass original event
         */
        element.bind('change', function(event) {
          scope.$parent.submissionForm[scope.fieldId].$setTouched()
          event.preventDefault()
          scope.onSuccess(event.originalEvent || event)
          $rootScope.$apply()
        })

        var input = element.find('input')
        input = input.length ? input[0] : input
        input.setAttribute('data-fp-maxSize', scope.maxSize)
        input.setAttribute('data-fp-services', scope.fpServices)
        input.setAttribute('data-fp-button-class', 'tc-btn')
        input.setAttribute('data-fp-drag-class', dragAreaClasses)
        input.setAttribute('data-fp-drag-text', dragText)
        input.setAttribute('data-fp-multiple', false)
        input.setAttribute('data-fp-mimetypes', scope.mimeTypes)
        input.setAttribute('data-fp-store-location', 's3')
        input.setAttribute('data-fp-store-container', scope.fpContainer)
        input.setAttribute('data-fp-store-path', scope.filePath)

        filepickerService.constructWidget(input)

        scope.onSuccess = function(event) {
          var fpFile = event.fpfile
          if (fpFile) {
            element.addClass('file-uploaded')
            var _file = {
              name: scope.filename || fpFile.filename,
              container: fpFile.container || scope.fpContainer,
              path: fpFile.key,
              size: fpFile.size,
              mimetype: fpFile.mimetype
            }
            scope.ngModel = _file
            scope.setFileReference({
              file: _file,
              fieldId: scope.fieldId
            })
          } else {
            element.removeClass('file-uploaded')
            scope.ngModel = null
            scope.setFileReference({
              file: null,
              fieldId: scope.fieldId
            })
          }
        }
      }
    }
  }
})()
