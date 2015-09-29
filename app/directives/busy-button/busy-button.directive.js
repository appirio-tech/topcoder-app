(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcBusyButton', tcBusyButton);

  function tcBusyButton() {
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
            element.removeAttr('disabled').html(scope.originalContent);
          }
        });
      }
    }
  }
})();
