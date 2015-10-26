(function() {
  'use strict';

  /**
   * @desc links data card directive
   * @example <external-links-data></external-links-data>
   */
  angular
    .module('tcUIComponents')
    .directive('externalWebLink', externalWebLink);

  function externalWebLink() {
    var directive = {
      estrict: 'E',
      templateUrl: 'directives/external-account/external-web-link.directive.html',
      scope: {
        linkedAccounts: '=',
        userHandle: '@'
      },
      controller: ['$log', '$scope', 'ExternalWebLinksService', ExternalWebLinkCtrl],
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;

    function ExternalWebLinkCtrl($log, $scope, ExternalWebLinksService) {
      $log = $log.getInstance('ExternalWebLinkCtrl');
      var vm = this;
      vm.addingWebLink = false;
      vm.errorMessage = null;

      vm.addWebLink = function() {
        $log.debug("URL: " + vm.url);
        vm.addingWebLink = true;
        vm.errorMessage = null;
        ExternalWebLinksService.addLink(vm.userHandle, vm.url)
          .then(function(resp) {
            vm.addingWebLink = false;
            $log.debug("Web link added: " + JSON.stringify(resp));
            vm.linkedAccounts.push(resp.profile);
            toaster.pop('success', "Success",
              String.supplant(
                "Your link has been added. Data from your link will be visible on your profile shortly.",
                {provider: extAccountProvider}
              )
            );
          })
          .catch(function(resp) {
            vm.addingWebLink = false;
            $log.debug(JSON.stringify(resp));
            if (resp.status === 'SOCIAL_PROFILE_ALREADY_EXISTS') {
              $log.info("Social profile already linked to another account");
              toaster.pop('error', "Whoops!",
                String.supplant(
                  "This {provider} account is linked to another account. \
                  If you think this is an error please contact <a href=\"mailTo:support@.appirio.com\">support@apprio.com</a>.", {
                    provider: extAccountProvider
                  }
                )
              );
            } else {
              $log.info("Server error:" + resp.content);
              vm.errorMessage = "Sorry, we are unable add web link. If problem persist please contact support@topcoder.com";
            }
          });
      };
    }
  }
})();
