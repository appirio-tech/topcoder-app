(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcFileInput', tcFileInput);

  function tcFileInput() {
    return {
      restrict: 'E',
      templateUrl: 'directives/tc-file-input/tc-file-input.html',
      scope: {
        labelText: '@',
        fieldId: '@',
        placeholder: '@',
        fileType: '@',
        mandatory: '=',
        buttonText: '@',
        setFileReference: '&'
      },
      link: function(scope, element, attrs) {
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
        });

        function selectFile() {
          fileInput.click();
        }
      }
    }
  }
})();
