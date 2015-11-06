(function() {
  'use strict';

  /**
   * @desc links data card directive
   * @example <external-links-data></external-links-data>
   */
  angular
    .module('tcUIComponents')
    .directive('externalWebLink', ExternalWebLink);
  ExternalWebLink.$inject = ['$log', 'ExternalWebLinksService', 'toaster'];

  function ExternalWebLink($log, ExternalWebLinksService, toaster) {
    var directive = {
      estrict: 'E',
      templateUrl: 'directives/external-account/external-web-link.directive.html',
      scope: {
        linkedAccounts: '=',
        userHandle: '@'
      },
      bindToController: true,
      controller: ['$log', ExternalWebLinkCtrl],
      controllerAs: 'vm'
    };


    function ExternalWebLinkCtrl($log) {
      $log = $log.getInstance('ExternalWebLinkCtrl');
      var vm = this;
      vm.addingWebLink = false;
      vm.errorMessage = null;

      vm.addWebLink = function() {
        $log.debug("URL: " + vm.url);
        vm.addingWebLink = true;
        vm.errorMessage = null;
        ExternalWebLinksService.addLink(vm.userHandle, vm.url)
          .then(function(data) {
            vm.addingWebLink = false;
            $log.debug("Web link added: " + JSON.stringify(data));
            vm.linkedAccounts.push(data);
            toaster.pop('success', "Success", "Your link has been added. Data from your link will be visible on your profile shortly.");
          })
          .catch(function(resp) {
            vm.addingWebLink = false;
            $log.error("Server error:" + resp.content);
            toaster.pop('error', "Sorry, we are unable add web link. If problem persist please contact support@topcoder.com");
          });
      };
    }

    return directive;
  }
})();
