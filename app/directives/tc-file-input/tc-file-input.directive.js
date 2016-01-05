(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcFileInput', tcFileInput);

  function tcFileInput() {
    return {
      restrict: 'E',
      require: '^form',
      templateUrl: 'directives/tc-file-input/tc-file-input.html',
      scope: {
        labelText: '@',
        fieldId: '@',
        placeholder: '@',
        fileType: '@',
        mandatory: '=',
        buttonText: '@',
        setFileReference: '&',
        fileValue: '=ngModel'
      },
      link: function(scope, element, attrs, formController) {
        scope.selectFile = selectFile;

        // fieldId is not set on element at this point, so grabbing with class .none
        // which exists on the element right away
        var fileInput = $(element[0]).find('.none');
        var fileNameInput = $(element[0]).find('input[type=text]');

        fileInput.bind('change', function() {
          var file = fileInput[0].files[0];

          // Pass file object up through callback into controller
          scope.setFileReference({file: file, fieldId: scope.fieldId});

          // Set the file name as the value of the disabled input
          fileNameInput[0].value = file.name;
          formController[attrs.fieldId].$setValidity('required', true);
        });

        function selectFile() {
          fileInput.click();
        }
      }
    }
  }
})();
