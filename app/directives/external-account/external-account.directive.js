(function() {
  'use strict';
  var _supportedAccounts = [
    { provider: "dribble", className: "fa-dribbble", displayName: "Dribble", disabled: true, order: 6, colorClass: 'el-dribble'},
    { provider: "linkedin", className: "fa-linkedin", displayName: "LinkedIn", disabled: true, order: 5, colorClass: 'el-linkedin'},
    { provider: "stackoverflow", className: "fa-stack-overflow", displayName: "Stack Overflow", disabled: true, order: 3, colorClass: 'el-stackoverflow'},
    { provider: "behance", className: "fa-behance", displayName: "Behance", disabled: true, order: 2, colorClass: 'el-behance'},
    // { provider: "google-oauth2", className: "fa-google-plus", displayName: "Google+", disabled: true, order: }, colorClass: 'el-dribble',
    { provider: "github", className: "fa-github", displayName: "Github", disabled: false, order: 1, colorClass: 'el-github'},
    { provider: "bitbucket", className: "fa-bitbucket", displayName: "Bitbucket", disabled: true, order: 7, colorClass: 'el-bitbucket'},
    { provider: "twitter", className: "fa-twitter", displayName: "Twitter", disabled: true, order: 4, colorClass: 'el-twitter'},
    //{ provider: "weblinks", className: "fa-globe", displayName: "Web Links", disabled: true, order: 8, colorClass: 'el-weblinks'}
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
        linkedAccountsData: '=',
        externalLinks: '='
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

          $scope.$watchCollection('externalLinks', function(newValue, oldValue) {
            angular.forEach(newValue, function(link) {
              var provider = link.providerType;

              if (!$scope.linkedAccountsData[provider]) {
                $scope.linkedAccounts.push({
                  provider: provider,
                  data: {
                    handle: link.name,
                    status: 'PENDING'
                  }
                });
              }
            });
          });
        }
      ]
    }
  })
  .directive('externalWebLink', function() {
    return {
     restrict: 'E',
      templateUrl: 'directives/external-account/external-web-link.directive.html',
      scope: {
        linkedAccounts: '=',
        userData: "="
      },
      controller: ['$log', '$scope', 'ExternalAccountService',
        function($log, $scope, ExternalAccountService) {
          $log = $log.getInstance('ExternalWebLinkDirective');
          $scope.addingWebLink = false;
          $scope.errorMessage = null;

          $log.debug("userData: " + $scope.userData.handle);

          $scope.addWebLink = function() {
            $log.debug("URL: " + $scope.url);
            $scope.addingWebLink = true;
            $scope.errorMessage = null;
            ExternalAccountService.addWebLink($scope.userData.userId, $scope.userData.handle, $scope.url)
              .then(function(resp) {
                $scope.addingWebLink = false;
                $log.debug("Web link added: " + JSON.stringify(resp));
                $scope.linkedAccounts.push(resp.profile);
                toaster.pop('success', "Success",
                  String.supplant(
                    "Your link has been added. Data from your link will be visible on your profile shortly.",
                    {provider: extAccountProvider}
                  )
                );
              })
              .catch(function(resp) {
                $scope.addingWebLink = false;
                $log.debug(JSON.stringify(resp));
                if (resp.status === 'SOCIAL_PROFILE_ALREADY_EXISTS') {
                  $log.info("Social profile already linked to another account");
                  toaster.pop('error', "Whoops!",
                    String.supplant(
                      "This {provider} account is linked to another account. \
                      If you think this is an error please contact <a href=\"mailTo:support@.appirio.com\">support@apprio.com</a>.",
                      {provider: extAccountProvider }
                    )
                  );
                } else {
                  $log.info("Server error:" + resp.content);
                  $scope.errorMessage = "Sorry, we are unable add web link. If problem persist please contact support@topcoder.com";
                }
              });
          };
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
