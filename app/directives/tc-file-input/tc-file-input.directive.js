(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcFileInput', tcFileInput);

  function tcFileInput() {
    return {
      restrict: 'E',
      require: ['^form', '^ngModel'],
      templateUrl: 'directives/tc-file-input/tc-file-input.html',
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
      link: function(scope, element, attrs, controllers) {
        var formController = controllers[0];
        var ngModel = controllers[1];

        scope.selectFile = selectFile;
        var fileTypes = scope.fileType.split(',');

        // fieldId is not set on element at this point, so grabbing with class .none
        // which exists on the element right away
        var fileInput = $(element[0]).find('.none');
        var fileNameInput = $(element[0]).find('input[type=text]');

        fileInput.bind('change', function() {
          var file = fileInput[0].files[0];

          var selectedFileType = file.type.slice(file.type.lastIndexOf('/') + 1);
          var isAllowedFileFormat = _.some(fileTypes, _.matches(selectedFileType));

          scope.$apply(function(){
            if (!isAllowedFileFormat) {
              fileNameInput[0].value = file.name;

              // Manually setting is required since Angular doesn't support file inputs
              formController[attrs.fieldId].$setTouched();
              formController[attrs.fieldId].$setValidity('required', false);

            } else {
              // Pass file object up through callback into controller
              scope.setFileReference({file: file, fieldId: scope.fieldId});

              // Set the file name as the value of the disabled input
              fileNameInput[0].value = file.name;

              // Manually set validity of specific input field
              formController[attrs.fieldId].$setValidity('required', true);
            }
          });
        });

        function selectFile() {
          fileInput.click();
        }
      }
    }
  }
})();
