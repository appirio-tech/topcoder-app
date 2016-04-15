import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('tcFileInput', ['$timeout', 'Helpers', 'logger', tcFileInput])

  function tcFileInput($timeout, Helpers, logger) {
    return {
      restrict: 'E',
      require: '^form',
      template: require('./tc-file-input')(),
      scope: {
        labelText: '@',
        fieldId: '@',
        placeholder: '@',
        fileType: '@',
        showFileType: '=',
        mandatory: '=',
        buttonText: '@',
        setFileReference: '&',
        ngModel: '='
      },
      link: function(scope, element, attrs, formController) {
        scope.selectFile = selectFile
        var fileTypes = scope.fileType.split(',')

        // fieldId is not set on element at this point, so grabbing with class .none
        // which exists on the element right away
        var fileInput = $(element[0]).find('.none')
        var fileNameInput = $(element[0]).find('input[type=text]')

        fileInput.bind('change', function(event) {
          var file = event.target.files[0]

          // About 1 in 20 times, the file is undefined (must be race condition)
          // Return early in this case so no errors are thrown
          if (!file) {
            return
          }

          var fileSize = file.size
          var fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)

          var isAllowedFileSize   = fileSize < '524288000'
          var isAllowedFileExt    = _.some(fileTypes, _.matches(fileExtension))
          var isAllowedMIMEType   = Helpers.isValidMIMEType(file.type, fileExtension)
          var isAllowedFileFormat = isAllowedFileExt && isAllowedMIMEType

          if (file && !isAllowedFileFormat) {
            logger.error(`Invalid file. Allowed extensions: ${scope.fileType}. Recieved file extension ${fileExtension} with MIME type ${file.type} and file size ${fileSize}`)
          }

          // Timeout needed for fixing IE bug ($apply already in progress)
          $timeout(function() {
            scope.$apply(function(){
              // Set the file name as the value of the disabled input
              fileNameInput[0].value = file.name
              var clickedFileInput = formController[attrs.fieldId]

              if (!isAllowedFileFormat) {
                // Manually setting is required since Angular doesn't support file inputs
                clickedFileInput.$setTouched()
                clickedFileInput.$setValidity('required', false)

              } else {
                clickedFileInput.$setValidity('required', true)
              }

              if (!isAllowedFileSize) {
                // Manually setting is required since Angular doesn't support file inputs
                clickedFileInput.$setTouched()
                clickedFileInput.$setValidity('filesize', false)

              } else {
                clickedFileInput.$setValidity('filesize', true)
              }

              if (isAllowedFileFormat && isAllowedFileSize) {
                // Pass file object up through callback into controller
                scope.setFileReference({file: file, fieldId: scope.fieldId})
              }
            })
          })
        })

        function selectFile() {
          fileInput.click()
        }
      }
    }
  }
})()
