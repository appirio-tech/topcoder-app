(function() {
  'use strict';

  /**
   * @desc links data card directive
   * @example <external-links-data></external-links-data>
   */
  angular
    .module('tcUIComponents')
    .directive('externalLinksData', externalLinksData);

  function externalLinksData() {
    var directive = {
     restrict: 'E',
      templateUrl: 'directives/external-account/external-link-data.directive.html',
      scope: {
        linkedAccountsData: '=',
        editable: '=',
        userHandle: '@'
      },
      controller: ['$log', '$scope', 'ExternalWebLinksService', 'toaster', 'ngDialog',
        function($log, $scope, ExternalWebLinksService, toaster, ngDialog) {

          $log = $log.getInstance("ExternalLinksDataCtrl");
          $scope.toDelete = null;
          $scope.deletionDialog = null;

          $scope.confirmDeletion = function(account) {
            $scope.toDelete = account;
            $scope.deletionDialog = ngDialog.open({
              className: 'ngdialog-theme-default tc-dialog',
              template: 'directives/external-account/external-link-deletion-confirm.html',
              scope: $scope
            }).closePromise.then(function (data) {
              $log.debug('Closing deletion confirmation dialog.');
              $scope.toDelete = null;
            });
          }

          $scope.deleteAccount = function() {
            $log.debug('Deleting Account...');
            var account = $scope.toDelete;
            if (account && account.deletingAccount) {
              $log.debug('Another deletion is already in progress.');
              return;
            }
            if (account && account.provider === 'weblink') {
              account.deletingAccount = true;
              $log.debug('Deleting weblink...');
              return ExternalWebLinksService.removeLink($scope.userHandle, account.key).then(function(data) {
                $scope.deletingAccount = false;
                $log.debug("Web link removed: " + JSON.stringify(data));
                var toRemove = _.findIndex($scope.linkedAccountsData, function(la) {
                  return la.provider === 'weblink' && la.key === account.key;
                });
                if (toRemove > -1) {
                  // remove from the linkedAccountsData array
                  $scope.linkedAccountsData.splice(toRemove, 1);
                }
                account.deletingAccount = false;
                toaster.pop('success', "Success", "Your link has been removed.");
              })
              .catch(function(resp) {
                var msg = resp.msg;
                if (resp.status === 'WEBLINK_NOT_EXIST') {
                  $log.info("Weblink does not exist");
                  msg = "Weblink is not linked to your account. If you think this is an error please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>.";
                } else {
                  $log.error("Fatal error: _unlink: " + msg);
                  msg = "Sorry! We are unable to remove your weblink. If problem persists, please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>";
                }

                account.deletingAccount = false;
                toaster.pop('error', "Whoops!", msg);
              });
            }
          }
        }
      ]
    };
    return directive;
  }
})();
