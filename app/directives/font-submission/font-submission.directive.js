(function() {
  'use strict';

  angular.module('tcUIComponents').directive('fontSubmission', fontSubmission);

  function fontSubmission() {
    return {
      restrict: 'E',
      templateUrl: 'directives/font-submission/font-submission.html',
      scope: true,
      controller: ['$scope', function($scope) {
        console.log('scope on font submission directive: ', $scope.submissionForm);
      }],
      controllerAs: 'fontSubmission'
    }
  }
})();
