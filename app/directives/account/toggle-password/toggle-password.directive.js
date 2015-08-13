(function() {
  'use strict';

  angular.module('tcUIComponents').directive('togglePassword', togglePassword);

  function togglePassword() {
    return {
      restrict: 'E',
      templateUrl: 'directives/account/toggle-password/toggle-password.html',
      controller: ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {

        var passwordInput, checkboxInput;
        var parentScope = $scope.vm;
        var defaultPlaceholder = 'Create Password';
        parentScope.placeholder = defaultPlaceholder;
        parentScope.showPassword = false;
        parentScope.password = '';

        $timeout(function() {
          passwordInput = $element.children()[0];
          checkboxInput = $element.children()[1].children[0];
          console.log('passwordinput: ', passwordInput);
          console.log('checkboxInput: ', checkboxInput);
        });


        console.log($scope);

        $scope.blur = function(e) {
          console.log('blurring from password input field');
          parentScope.passwordFocus = false;

          $timeout(function() {
            console.log('after timeout password focus value is : ', parentScope.passwordFocus);
            if (parentScope.passwordFocus !== true) {
              console.log('password focus was not set back to true by checkbox');
              parentScope.passwordFocus = false;
            }
          }, 0);

          if (parentScope.password === '' || parentScope.password === undefined) {
            console.log('putting default placeholder and setting field to pristine')
            parentScope.placeholder = defaultPlaceholder;
            $scope.registerForm.password.$setPristine();
            parentScope.showPassword = undefined;
          }
        };

        $scope.toggleInputType = function() {
          if (parentScope.showPassword === true) {
            return 'text';
          } else {
            return 'password';
          }
        }

        $scope.checksomething = function() {
          console.log('clicking button');
          console.log('showing or hiding password');
          parentScope.passwordFocus = true;
          $scope.$broadcast('refocus');
        };

        // $element.bind('mousedown', $scope.broadcastOnClick);
      }]
    };
  }
})();
