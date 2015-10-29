(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcBusyButton', tcBusyButton);

  tcBusyButton.$inject = ['$parse'];

  function tcBusyButton($parse) {
    return {
      restrict: "A",
      scope: {
        tcBusyMessage: "=",
        tcBusyWhen: "="
      },
      link: function(scope, element, attrs) {
        scope.originalContent = element.html();
        scope.busyMessage = attrs.tcBusyMessage || "Saving...";
        scope.$watch('tcBusyWhen', function(newValue, oldValue) {
          if (newValue !== oldValue && newValue === true) {

            var busyMessageHtml = String.supplant(
              '<i class="fa fa-spinner fa-spin"></i>&nbsp;<span style="text-transform:none;">{busyMessage}</span>',
              scope);
            element.attr('disabled', true).html('').append(busyMessageHtml);
          } else {
            // remove the disabled attribute only if either element does not have disabled set
            // or it evaluates to false
            if (!attrs.disabled) {
              element.removeAttr('disabled');
            }
            element.html(scope.originalContent);
          }
        });
      }
    }
  }
})();
