(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcFormFonts', tcFormFonts);

  function tcFormFonts() {
    return {
      restrict: 'E',
      templateUrl: 'directives/tc-form-fonts/tc-form-fonts.html',
      scope: {
        formFonts: '='
      },
      link: function(scope, element, attrs) {
        // console.log('scope on font submission directive: ', scope.submissionForm);

      },
      controller: ['$scope', function($scope) {
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

        $scope.urlRegEx = new RegExp(/^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/);

        $scope.selectFont = function(newFont) {
          // Find the right font section and change that source value to the value that the user selected
          var id = newFont.id;
          $scope.formFonts[id].source = newFont.value;
        };

        $scope.createAdditionalFontFieldset = function() {
          var newId = $scope.formFonts.length;

          // Create copy of list with new, incremented ID
          var newFontList = $scope['fontList' + newId] = angular.copy($scope['fontList' + (newId - 1)]);

          newFontList.forEach(function(font) {
            font.id++;
          });

          $scope.formFonts.push({
            id: newId,
            source: '',
            name: '',
            sourceUrl: ''
          });
        }
      }]
    }
  }
})();
