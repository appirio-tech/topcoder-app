(function() {
  'use strict';
  angular.module('tcUIComponents')
  .directive('externalAccounts', function() {

    var _supportedAccounts = [
      { provider: "dribble", className: "fa-dribbble", displayName: "Dribble"},
      { provider: "linkedin", className: "fa-linkedin", displayName: "LinkedIn"},
      { provider: "stackoverflow", className: "fa-stack-overflow", displayName: "StackOverflow"},
      { provider: "behance", className: "fa-behance", displayName: "Behance"},
      { provider: "google-oauth2", className: "fa-google-plus", displayName: "Google+"},
      { provider: "github", className: "fa-github", displayName: "Github"},
      { provider: "bitbucket", className: "fa-bitbucket", displayName: "Bitbucket"},
      // TODO  add more
    ];

    return {
      restrict: 'E',
      templateUrl: 'directives/external-account/external-account.directive.html',
      scope: {
        linkedAccounts: '='
      },
      controller: ['$log', '$scope', 'ExternalAccountService', '$state', function($log, $scope, ExternalAccountService, $state) {
        $log = $log.getInstance("ExtAccountDirectiveCtrl")

        $scope.$watch('linkedAccounts', function(newValue, oldValue) {
          for (var i=0;i<_supportedAccounts.length;i++) {
            $scope.accountList[i] = _supportedAccounts[i];
            $scope.accountList[i].linked = !!_.find(newValue, function(a) {
              return $scope.accountList[i].provider === a.providerType;
            });
          }
        });
        $scope.accountList = [];
        for (var i=0;i<_supportedAccounts.length;i++) {
          $scope.accountList[i] = _supportedAccounts[i];
          $scope.accountList[i].linked = !!_.find($scope.linkedAccounts, function(a) {
            return $scope.accountList[i].provider === a.providerType;
          });
        }

        $scope.link = function(provider) {
          $log.debug(String.supplant('connecting to ' + provider));
          var callbackUrl = $state.href('settings.profile', {}, {absolute: true});
          ExternalAccountService.linkExternalAccount(provider, callbackUrl)
          .then(function(resp) {
            $log.debug("Social account linked: " + JSON.stringify(resp));
            linkedAccounts.push(resp.profile);
          })
          .catch(function(resp) {
            if (resp.status === 'SOCIAL_PROFILE_ALREADY_EXISTS') {
              $log.info("Social profile already linked to another account");
            }
          });
        };
      }]
    };
  });
})();
