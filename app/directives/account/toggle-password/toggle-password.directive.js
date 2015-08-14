(function() {
  'use strict';

  angular.module('tcUIComponents').directive('togglePassword', togglePassword);

  function togglePassword() {
    return {
      restrict: 'E',
      templateUrl: 'directives/account/toggle-password/toggle-password.html',
      controller: ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {

        var passwordInput;
        var parentScope = $scope.vm;
        var defaultPlaceholder = 'Create Password';
        parentScope.placeholder = defaultPlaceholder;
        parentScope.password = '';

        $timeout(function() {
          passwordInput = $element.children()[0];
        });

        $element.bind('click', function(event) {
          passwordInput.focus();
        });

        $scope.onFocus = function(event) {
          parentScope.passwordFocus = true;
          parentScope.placeholder = '';
        }

        $scope.onBlur = function(event) {
          var relatedTarget = angular.element(event.relatedTarget);

          if (relatedTarget.attr('type') === 'checkbox') {
            parentScope.passwordFocus = true;
            parentScope.placeholder = '';
          } else {
            parentScope.passwordFocus = false;

            if (parentScope.password === '' || parentScope.password === undefined) {
              parentScope.placeholder = defaultPlaceholder;
              $scope.registerForm.password.$setPristine();
            }
          }
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
