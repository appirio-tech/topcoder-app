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
        parentScope.password = '';

        $timeout(function() {
          passwordInput = $element.children()[0];
          checkboxInput = $element.children()[1].children[0];
          console.log('passwordinput: ', passwordInput);
          console.log('checkboxInput: ', checkboxInput);
        });

        $element.bind('click', function(event) {
          passwordInput.focus();
        });

        $scope.onFocus = function(event) {
          // console.log("EVENT FOCUS: ", event);
          parentScope.passwordFocus = true;
          parentScope.placeholder = '';
        }

        $scope.onBlur = function(event) {
          console.log("EVENT BLUR: ", event.relatedTarget);
          parentScope.passwordFocus = false;

          // $timeout(function() {
          //   console.log('after timeout password focus value is : ', parentScope.passwordFocus);
          //   if (parentScope.passwordFocus !== true) {
          //     console.log('password focus was not set back to true by checkbox');
          //     parentScope.passwordFocus = false;
          //   }
          // }, 0);

          $timeout(function() {
            if (parentScope.password === '' || parentScope.password === undefined) {
              console.log('putting default placeholder and setting field to pristine')
              parentScope.placeholder = defaultPlaceholder;
              $scope.registerForm.password.$setPristine();
            }
          }, 0);
        };

        $scope.labelClicked = function() {
          console.log('label clicked');
          $scope.refocus = !$scope.refocus;
        };

        $scope.toggleInputType = function() {
          var $passwordInput = angular.element(passwordInput);

          if ($passwordInput.attr('type') === 'text') {
            $passwordInput.attr('type', 'password');
          } else {
            $passwordInput.attr('type', 'text');
          }
        }
      }]
    };
  }
})();
