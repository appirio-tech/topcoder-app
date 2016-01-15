(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcFormStockart', tcFormStockart);

  function tcFormStockart() {
    return {
      restrict: 'E',
      require: '^form',
      templateUrl: 'directives/tc-form-stockart/tc-form-stockart.html',
      scope: {
        formStockarts: '='
      },
      link: function(scope, element, attrs, formController) {
        scope.submissionForm = formController;

      },
      controller: ['$scope', function($scope) {
        var stockartId = 0;
        var emptyStockart = {
          description: '',
          sourceUrl: '',
          fileNumber: '',
          isPhotoDescriptionRequired: false,
          isPhotoURLRequired: false,
          isFileNumberRequired: false
        };

        // Initialize stockart form data
        $scope.formStockarts = { 0: _.assign({id: 0}, angular.copy(emptyStockart)) };

        $scope.urlRegEx = new RegExp(/^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/);

        $scope.createAdditionalStockartFieldset = function() {
          var newId = ++stockartId;

          $scope.formStockarts[newId] = _.assign({ id: newId }, angular.copy(emptyStockart));
        }

        $scope.deleteStockartFieldset = function(index) {

          // If only one stockart fieldset is there, just reset the values
          // so that ng-repeat doesn't refresh and there is no UI flickering
          if (Object.keys($scope.formStockarts).length === 1) {
            $scope.submissionForm['photoDescription' + index].$setPristine();
            $scope.submissionForm['photoURL' + index].$setPristine();
            $scope.submissionForm['fileNumber' + index].$setPristine();
            $scope.formStockarts[index] = angular.copy(emptyStockart);

          } else {
            delete $scope.formStockarts[index];
          }
        }

        $scope.isButtonDisabled = function() {
          return _.some($scope.formStockarts, function(stockart) {
            return !stockart.description || !stockart.sourceUrl || !stockart.fileNumber;
          });
        }

        $scope.showMandatoryMessage = function(inputValue, inputName) {
          var id = inputName.slice(-1);

          var stockartSection = $scope.formStockarts[id];

          var stockartDescription = stockartSection.description;
          var stockartSourceUrl = stockartSection.sourceUrl;
          var stockartFileNumber = stockartSection.fileNumber;

          if (!stockartDescription && !stockartSourceUrl && !stockartFileNumber) {
            // All fields empty so required should be false
            stockartSection.isPhotoDescriptionRequired = false;
            stockartSection.isPhotoURLRequired = false;
            stockartSection.isFileNumberRequired = false;
          } else if (stockartDescription && stockartSourceUrl && stockartFileNumber) {
            // All fields filled out, so required should be false
            stockartSection.isPhotoDescriptionRequired = false;
            stockartSection.isPhotoURLRequired = false;
            stockartSection.isFileNumberRequired = false;
          } else {
            // Fields are not completely filled out or completely blank so setting required to true
            stockartSection.isPhotoDescriptionRequired = true;
            stockartSection.isPhotoURLRequired = true;
            stockartSection.isFileNumberRequired = true;
          }
        }
      }]
    }
  }
})();
