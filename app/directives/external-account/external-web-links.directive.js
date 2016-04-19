import angular from 'angular'

(function() {
  'use strict'

  // @desc links data card directive
  // @example <external-links-data></external-links-data>
  angular.module('tcUIComponents').directive('externalWebLink', ExternalWebLink)

  ExternalWebLink.$inject = ['logger', 'ExternalWebLinksService', 'toaster']

  function ExternalWebLink(logger, ExternalWebLinksService, toaster) {
    var directive = {
      restrict: 'E',
      template: require('./external-web-link')(),
      scope: {
        linkedAccounts: '=',
        userHandle: '@'
      },
      controller: ['$scope', 'logger', ExternalWebLinkCtrl]
    }


    function ExternalWebLinkCtrl($scope, logger) {
      $scope.addingWebLink = false
      $scope.errorMessage = null
      $scope.urlRegEx = /^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,15})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/

      $scope.addWebLink = function() {
        logger.debug('URL: ' + $scope.url)
        $scope.addingWebLink = true
        $scope.errorMessage = null

        ExternalWebLinksService.addLink($scope.userHandle, $scope.url)
          .then(function(data) {
            $scope.addingWebLink = false
            logger.debug('Web link added: ' + JSON.stringify(data))
            data.data.provider = data.provider
            $scope.linkedAccounts.push(data.data)
            // reset the form when it is successfully added
            $scope.addWebLinkFrm.$setPristine()
            $scope.url = null
            toaster.pop('success', 'Success', 'Your link has been added. Data from your link will be visible on your profile shortly.')
          })
          .catch(function(err) {
            $scope.addingWebLink = false

            if (err.status === 'WEBLINK_ALREADY_EXISTS') {
              logger.info('Social profile already linked to another account')

              toaster.pop('error', 'Whoops!',
                  'This weblink is already added to your account. \
                  If you think this is an error please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>.'
              )
            } else {
              logger.error('Fatal Error: addWebLink', err.msg)

              toaster.pop('error', 'Sorry, we are unable add web link. If problem persist please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>.')
            }
          })
      }
    }

    return directive
  }
})()
