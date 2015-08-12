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

        // $element.bind('click', function(event) {
        //   if ($element.children()[1].className.indexOf('ng-show') > -1) {
        //     console.log('found class');
        //     event.preventDefault();
        //     $scope.checksomething();
        //   }
        //   console.log($element.children());
        //   console.log('outer directives event: ', event);
        // });

        $scope.broadcastOnClick = function() {
          $timeout(function() {
            $scope.$broadcast('focusPassword');
          });
        };

        console.log($scope);

        $scope.blur = function(e) {
          console.log('blurring');
          parentScope.passwordFocus = false;

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
          // console.log(checkboxInput.blur());
          console.log(passwordInput.focus());
        };

        $element.bind('mousedown', $scope.broadcastOnClick);
      }]
    };
  }
})();
