import angular from 'angular'

(function() {
  'use strict'

  // @desc links data card directive
  // @example <external-links-data></external-links-data>
  angular.module('tcUIComponents').directive('externalWebLink', ExternalWebLink)

  ExternalWebLink.$inject = ['$log', 'ExternalWebLinksService', 'toaster']

  function ExternalWebLink($log, ExternalWebLinksService, toaster) {
    var directive = {
      restrict: 'E',
      template: require('./external-web-link')(),
      scope: {
        linkedAccounts: '=',
        userHandle: '@'
      },
      controller: ['$scope', '$log', ExternalWebLinkCtrl]
    }


    function ExternalWebLinkCtrl($scope, $log) {
      $log = $log.getInstance('ExternalWebLinkCtrl')
      $scope.addingWebLink = false
      $scope.errorMessage = null
      $scope.urlRegEx = /^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,15})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/

      $scope.addWebLink = function() {
        $log.debug('URL: ' + $scope.url)
        $scope.addingWebLink = true
        $scope.errorMessage = null
        ExternalWebLinksService.addLink($scope.userHandle, $scope.url)
          .then(function(data) {
            $scope.addingWebLink = false
            $log.debug('Web link added: ' + JSON.stringify(data))
            data.data.provider = data.provider
            $scope.linkedAccounts.push(data.data)
            // reset the form when it is successfully added
            $scope.addWebLinkFrm.$setPristine()
            $scope.url = null
            toaster.pop('success', 'Success', 'Your link has been added. Data from your link will be visible on your profile shortly.')
          })
          .catch(function(resp) {
            $scope.addingWebLink = false

            if (resp.status === 'WEBLINK_ALREADY_EXISTS') {
              $log.info('Social profile already linked to another account')
              toaster.pop('error', 'Whoops!',
                  'This weblink is already added to your account. \
                  If you think this is an error please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>.'
              )
            } else {
              $log.error('Fatal Error: addWebLink: ' + resp.msg)
              toaster.pop('error', 'Sorry, we are unable add web link. If problem persist please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>.')
            }
          })
      }
    }

    return directive
  }
})()
