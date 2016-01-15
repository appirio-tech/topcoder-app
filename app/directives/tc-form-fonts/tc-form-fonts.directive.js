(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcFormFonts', tcFormFonts);

  function tcFormFonts() {
    return {
      restrict: 'E',
      require: '^form',
      templateUrl: 'directives/tc-form-fonts/tc-form-fonts.html',
      scope: {
        formFonts: '='
      },
      link: function(scope, element, attrs, formController) {
        scope.submissionForm = formController;
      },
      controller: ['$scope', function($scope) {
        var fontsId = 0;

        // Must provide React Select component a list with ID, since currently
        // the onChange callback does not indicate which dropdown called the callback.
        // There are pull requests pending for react-select which will clean this code up
        $scope.fontList0 = [
          { label: 'Studio Standard Fonts List', value: 'STUDIO_STANDARD_FONTS_LIST', id: 0 },
          { label: 'Fonts.com', value: 'FONTS_DOT_COM', id: 0  },
          { label: 'MyFonts', value: 'MYFONTS', id: 0  },
          { label: 'Adobe Fonts', value: 'ADOBE_FONTS', id: 0  },
          { label: 'Font Shop', value: 'FONT_SHOP', id: 0  },
          { label: 'T.26 Digital Type Foundry', value: 'T26_DIGITAL_TYPE_FOUNDRY', id: 0  },
          { label: 'Font Squirrel', value: 'FONT_SQUIRREL', id: 0  },
          { label: 'Typography.com', value: 'TYPOGRAPHY_DOT_COM', id: 0 }
        ];

        var emptyFont = {
          source: '',
          name: '',
          sourceUrl: '',
          isFontUrlRequired: false,
          isFontUrlDisabled: true,
          isFontNameRequired: false,
          isFontNameDisabled: true,
          isFontSourceRequired: false
        };

        // Initialize font form data
        $scope.formFonts = { 0: _.assign({id: 0}, angular.copy(emptyFont)) };

        $scope.urlRegEx = new RegExp(/^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/);

        $scope.selectFont = function(newFont) {

          // Find the right font section,
          // and change that source value to the value that the user selected
          var targetedFont = $scope.formFonts[newFont.id];

          targetedFont.source = newFont.value;

          if (newFont.value === 'STUDIO_STANDARD_FONTS_LIST') {
            targetedFont.isFontNameRequired = true;
            targetedFont.isFontNameDisabled = false;
            targetedFont.isFontUrlRequired = false;
            targetedFont.isFontUrlDisabled = false;

          } else if (newFont.value) {
            targetedFont.isFontNameRequired = true;
            targetedFont.isFontNameDisabled = false;
            targetedFont.isFontUrlRequired = true;
            targetedFont.isFontUrlDisabled = false;
          }
        };

        $scope.createAdditionalFontFieldset = function() {
          var newId = ++fontsId;

          // Create copy of list with new, incremented ID
          var newFontList = $scope['fontList' + newId] = angular.copy($scope['fontList' + (newId - 1)]);
          newFontList.forEach(function(font) {
            font.id++;
          });

          // Add empty font with new ID to scope
          $scope.formFonts[newId] = _.assign({ id: newId }, angular.copy(emptyFont));
        }

        $scope.deleteFontFieldset = function(index) {

          // If only one font fieldset is there, just reset the values
          // so that ng-repeat doesn't refresh and there is no UI flickering
          if (Object.keys($scope.formFonts).length === 1) {
            $scope.submissionForm['fontName' + index].$setPristine();
            $scope.submissionForm['fontUrl' + index].$setPristine();
            $scope.formFonts[index] = angular.copy(emptyFont);

          } else {
            delete $scope.formFonts[index];
          }
        }

        $scope.isButtonDisabled = function() {
          return _.some($scope.formFonts, function(font) {
            if (font.source === 'STUDIO_STANDARD_FONTS_LIST') {
              return !font.source || !font.name;
            } else {
              return !font.source || !font.name || !font.sourceUrl;
            }
          });
        }
      }]
    }
  }
})();
