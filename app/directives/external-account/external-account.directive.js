(function() {
  'use strict';
  var _supportedAccounts = [
    { provider: "dribbble", className: "fa-dribbble", displayName: "Dribbble", disabled: false, order: 6, colorClass: 'el-dribble', featured: true},
    { provider: "linkedin", className: "fa-linkedin", displayName: "LinkedIn", disabled: true, order: 5, colorClass: 'el-linkedin', featured: true},
    { provider: "stackoverflow", className: "fa-stack-overflow", displayName: "Stack Overflow", disabled: false, order: 3, colorClass: 'el-stackoverflow'},
    { provider: "behance", className: "fa-behance", displayName: "Behance", disabled: true, order: 2, colorClass: 'el-behance'},
    { provider: "github", className: "fa-github", displayName: "Github", disabled: false, order: 1, colorClass: 'el-github', featured: true},
    { provider: "bitbucket", className: "fa-bitbucket", displayName: "Bitbucket", disabled: false, order: 7, colorClass: 'el-bitbucket'},
    { provider: "twitter", className: "fa-twitter", displayName: "Twitter", disabled: true, order: 4, colorClass: 'el-twitter'},
    { provider: "weblink", className: "fa-globe", displayName: "Web Links", disabled: true, order: -1, colorClass: 'el-weblinks'}
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

          var _accountList = _.clone(_supportedAccounts, true);
          _.remove(_accountList, function(al) { return al.order < 0});
          $scope.$watchCollection('linkedAccounts', function(newValue, oldValue) {
            if (newValue) {
              angular.forEach(_accountList, function(account) {
                var _linkedAccount = _.find(newValue, function(p) {
                  return p.provider === account.provider
                });
                var accountStatus = _.get(_linkedAccount, 'data.status', null);
                if (!_linkedAccount) {
                  account.status = 'unlinked';
                } else if(accountStatus && accountStatus.toLowerCase() === 'pending') {
                  account.status = 'pending';
                } else {
                  account.status = 'linked';
                }
              });
              $scope.accountList = _accountList;
            }
          });

          $scope.handleClick = function(provider, status) {
            var provider = _.find(_supportedAccounts, function(s) {
              return s.provider === provider;
            });
            if (status === 'linked') {
              $log.debug(String.supplant('UnLinking to ' + provider.displayName));
              _unlink(provider);
            } else if (status === 'unlinked') {
              $log.debug(String.supplant('Linking to ' + provider.displayName));
              _link(provider);
            }
          };

          function _link(provider) {
            ExternalAccountService.linkExternalAccount(provider.provider, null)
            .then(function(resp) {
              $log.debug("Social account linked: " + JSON.stringify(resp));
              $scope.linkedAccounts.push(resp.profile);
              toaster.pop('success', "Success",
                String.supplant(
                  "Your {provider} account has been linked. Data from your linked account will be visible on your profile shortly.",
                  {provider: provider.displayName}
                )
              );
            })
            .catch(function(resp) {
              if (resp.status === 'SOCIAL_PROFILE_ALREADY_EXISTS') {
                $log.info("Social profile already linked to another account");
                toaster.pop('error', "Whoops!",
                  String.supplant(
                    "This {provider} account is linked to another account. \
                    If you think this is an error please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>.",
                    {provider: provider.displayName }
                  )
                );
              } else {
                $log.error("Fatal Error: _link: " + resp.msg);
                toaster.pop('error', "Whoops!", "Sorry, we are unable to add your account right now. Please try again later. If the problem persists, please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>.");
              }
            });
          }

          function _unlink(provider) {
            return ExternalAccountService.unlinkExternalAccount(provider.provider)
            .then(function(resp) {
              $log.debug("Social account unlinked: " + JSON.stringify(resp));
              var toRemove = _.findIndex($scope.linkedAccounts, function(la) {
                return la.provider === provider.provider;
              });
              // remove from both links array and links data array
              $scope.linkedAccounts.splice(toRemove, 1);
              toaster.pop('success', "Success",
                String.supplant(
                  "Your {provider} account has been unlinked.",
                  {provider: provider.displayName}
                )
              );
            })
            .catch(function(resp) {
              var msg = resp.msg;
              if (resp.status === 'SOCIAL_PROFILE_NOT_EXIST') {
                $log.info("Social profile not linked to account");
                msg = "{provider} account is not linked to your account. If you think this is an error please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>.";
              } else {
                $log.error("Fatal error: _unlink: " + msg);
                msg = "Sorry! We are unable to unlink your {provider} account. If problem persists, please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>";
              }
              toaster.pop('error', "Whoops!", String.supplant(msg, {provider: provider.displayName }));
            });
          }
        }
      ]
    };
  })
  .filter('providerData', function() {
    return function(input, field) {
      return _.result(_.find(_supportedAccounts, function(s) {
        return s.provider === input.provider;
      }), field) || "";
    };
  });
})();
