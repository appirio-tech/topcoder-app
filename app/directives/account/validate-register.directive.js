import angular from 'angular'

(function() {
  'use strict'

  angular.module('tcUIComponents')
    .directive('hasLetter', hasLetter)
    .directive('hasSymbolOrNumber', hasSymbolOrNumber)
    .directive('hasNumber', hasNumber)
    .directive('usernameIsFree', usernameIsFree)
    .directive('emailIsAvailable', emailIsAvailable)

  function hasLetter() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$validators.hasLetter = function(modelValue, viewValue) {
          if (/[a-zA-Z]/.test(viewValue)) {
            return true
          }
          return false
        }
      }
    }
  }

  function hasSymbolOrNumber() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$validators.hasSymbolOrNumber = function(modelValue, viewValue) {
          if (/[-!$@#%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(viewValue) || /[\d]/.test(viewValue)) {
            return true
          }
          return false
        }
      }
    }
  }

  function hasNumber() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$validators.hasNumber = function(modelValue, viewValue) {
          if (/[\d]/.test(viewValue)) {
            return true
          }
          return false
        }
      }
    }
  }

  usernameIsFree.$inject = ['UserService', '$log', '$q']

  function usernameIsFree(UserService, $log, $q) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$asyncValidators.usernameIsFree = function(modelValue, viewValue) {
          $log.info('Validating username: ' + modelValue)

          var defer = $q.defer()

          UserService.validateUserHandle(modelValue).then(function(res) {
            if (res.valid) {
              return defer.resolve()
            } else {
              switch (res.reasonCode) {
              case 'INVALID_LENGTH':
                scope.vm.usernameErrorMessage = 'That username is not the correct length or format.'
                break
              case 'INVALID_FORMAT':
                scope.vm.usernameErrorMessage = 'That username is not the correct length or format.'
                break
              case 'INVALID_HANDLE':
                scope.vm.usernameErrorMessage = 'That username is not allowed.'
                break
              case 'ALREADY_TAKEN':
                scope.vm.usernameErrorMessage = 'That username is already taken.'
                break
              default:
                scope.vm.usernameErrorMessage = 'That username is not the correct length or format.'
              }

              return defer.reject(res.reasonCode)
            }
          }).catch(function(err) {
            // call failed - assuming username is free, register call will fail anyways
            return defer.resolve()
          })

          return defer.promise
        }
      }
    }
  }

  emailIsAvailable.$inject = ['UserService', '$log', '$q']

  function emailIsAvailable(UserService, $log, $q) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$asyncValidators.emailIsAvailable = function(modelValue, viewValue) {
          $log.info('Validating email: ' + modelValue)

          var defer = $q.defer()

          UserService.validateUserEmail(modelValue).then(function(res) {
            if (res.valid) {
              return defer.resolve()
            } else {
              switch (res.reasonCode) {
              case 'ALREADY_TAKEN':
                scope.vm.emailErrorMessage = 'That email address is already taken.'
                break
              case 'INVALID_EMAIL':
                scope.vm.emailErrorMessage = 'Please enter a valid email address.'
                break
              case 'INVALID_LENGTH':
                scope.vm.emailErrorMessage = 'Email address should be 100 characters or less.'
                break
              default:
                scope.vm.emailErrorMessage = 'Please enter a valid email address.'
              }

              return defer.reject(res.reasonCode)
            }
          }).
          catch(function(err) {
            // call failed - assuming available is free, register call will fail anyways
            return defer.resolve()
          })

          return defer.promise
        }
      }
    }
  }
})()
