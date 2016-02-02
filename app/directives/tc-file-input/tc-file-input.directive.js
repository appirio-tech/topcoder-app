import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('tcFileInput', tcFileInput)

  function tcFileInput() {
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
          var isAllowedFileSize = fileSize < '500000000'

          var selectedFileType = file.type.slice(file.type.lastIndexOf('/') + 1)
          var isAllowedFileFormat = _.some(fileTypes, _.matches(selectedFileType))

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

        function selectFile() {
          fileInput.click()
        }
      }
    }
  }
})()
