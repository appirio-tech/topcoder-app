(function() {
  'use strict';
  var _supportedAccounts = [
    // { provider: "dribble", className: "fa-dribbble", displayName: "Dribble"},
    // { provider: "linkedin", className: "fa-linkedin", displayName: "LinkedIn"},
    // { provider: "stackoverflow", className: "fa-stack-overflow", displayName: "StackOverflow"},
    // { provider: "behance", className: "fa-behance", displayName: "Behance"},
    // { provider: "google-oauth2", className: "fa-google-plus", displayName: "Google+"},
    { provider: "github", className: "fa-github", displayName: "Github"},
    // { provider: "bitbucket", className: "fa-bitbucket", displayName: "Bitbucket"},
    // { provider: "twitter", className: "fa-twitter", displayName: "Twitter"},
    // TODO  add more
  ];

  angular.module('tcUIComponents')
  .directive('externalAccounts', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/external-account/external-account.directive.html',
      scope: {
        linkedAccounts: '=',
        readOnly: '='
      },
      controller: ['$log', '$scope', 'ExternalAccountService', 'toaster',
        function($log, $scope, ExternalAccountService, toaster) {
          $log = $log.getInstance("ExtAccountDirectiveCtrl")
          $scope.accountList = _.clone(_supportedAccounts, true);
          $scope.$watch('linkedAccounts', function(newValue, oldValue) {
            for (var i=0;i<$scope.accountList.length;i++) {
              $scope.accountList[i].linked = !!_.find(newValue, function(a) {
                return $scope.accountList[i].provider === a.providerType;
              });
            }
          });

          $scope.link = function(provider) {
            $log.debug(String.supplant('connecting to ' + provider));
            // var callbackUrl = $state.href('settings.profile', {}, {absolute: true});
            var extAccountProvider = _.result(_.find(_supportedAccounts, function(s) {
              return s.provider === provider;
            }), 'displayName');
            ExternalAccountService.linkExternalAccount(provider, null)
            .then(function(resp) {
              $log.debug("Social account linked: " + JSON.stringify(resp));
              $scope.linkedAccounts.push(resp.profile);
              toaster.pop('success', "Success",
                String.supplant(
                  "Your {provider} account has been linked. Data from your linked account will be visible on your profile shortly.",
                  {provider: extAccountProvider}
                )
              );
            })
            .catch(function(resp) {
              if (resp.status === 'SOCIAL_PROFILE_ALREADY_EXISTS') {
                $log.info("Social profile already linked to another account");
                toaster.pop('error', "Whoops!",
                  String.supplant(
                    "This {provider} account is linked to another account. \
                    If you think this is an error please contact <a href=\"mailTo:support@.appirio.com\">support@apprio.com</a>.",
                    {provider: extAccountProvider }
                  )
                );
              }
            });
          };
        }
      ]
    };
  })
  .directive('externalLinksData', function() {
    return {
     restrict: 'E',
      templateUrl: 'directives/external-account/external-link-data.directive.html',
      scope: {
        linkedAccountsData: '='
      },
      controller: ['$log', '$scope', 'ExternalAccountService',
        function($log, $scope, ExternalAccountService) {
          $log = $log.getInstance('ExternalLinksDataDirective');
          $scope.$watch('linkedAccountsData', function(newValue, oldValue) {
            var linkedAccounts = [];
            for (var i=0;i<_supportedAccounts.length;i++) {
              var n = _supportedAccounts[i],
                extObj = _.get(newValue, n.provider, null);
              if (extObj) {
                linkedAccounts.push({
                  provider: n.provider,
                  data: extObj
                });
              }
            }
            $scope.linkedAccounts = linkedAccounts;
          });
        }
      ]
    }
  })
  .filter('providerData', function() {
    return function(input, field) {
      return _.result(_.find(_supportedAccounts, function(s) {
        return s.provider === input.provider;
      }), field) || "";
    };
  });
})();
