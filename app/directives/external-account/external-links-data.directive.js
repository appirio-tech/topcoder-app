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
          $scope.deletionDialog = null;

          $scope.confirmDeletion = function(account) {
            // for non weblink provider, do nothing
            if (account.provider !== 'weblink') {
              return;
            }
            // do nothing for pending state cards
            if (account.status === 'PENDING') {
              return;
            }
            $scope.deletionDialog = ngDialog.open({
              className: 'ngdialog-theme-default tc-dialog',
              template: 'directives/external-account/external-link-deletion-confirm.html',
              controller: 'ExternalLinkDeletionController',
              controllerAs: 'vm',
              resolve: {
                userHandle: function() {
                  return $scope.userHandle;
                },
                account: function() {
                  return account;
                },
                linkedAccountsData: function() {
                  return $scope.linkedAccountsData;
                }
              }
            }).closePromise.then(function (data) {
              $log.debug('Closing deletion confirmation dialog.');
            });
          }
        }
      ]
    };
    return directive;
  }
})();
