import angular from 'angular'
import _ from 'lodash'

(function () {
  angular.module('tcUIComponents')
    .controller('ExternalLinkDeletionController', ExternalLinkDeletionController)

  ExternalLinkDeletionController.$inject = ['ExternalWebLinksService', '$q', 'logger', 'toaster', 'ngDialog', 'userHandle', 'account', 'linkedAccountsData']

  function ExternalLinkDeletionController(ExternalWebLinksService, $q, logger, toaster, ngDialog, userHandle, account, linkedAccountsData) {
    var vm = this
    vm.account = account

    vm.deleteAccount = function() {
      logger.debug('Deleting Account...')

      if (account && account.deletingAccount) {
        logger.debug('Another deletion is already in progress.')
        return
      }

      if (account && account.provider === 'weblink') {
        account.deletingAccount = true
        logger.debug('Deleting weblink...')

        return ExternalWebLinksService.removeLink(userHandle, account.key)
          .then(function(data) {
            account.deletingAccount = false
            logger.debug('Web link removed: ' + JSON.stringify(data))
            var toRemove = _.findIndex(linkedAccountsData, function(la) {
              return la.provider === 'weblink' && la.key === account.key
            })
            if (toRemove > -1) {
              // remove from the linkedAccountsData array
              linkedAccountsData.splice(toRemove, 1)
            }
            toaster.pop('success', 'Success', 'Your link has been removed.')
          })
          .catch(function(err) {
            var msg = err.msg
            if (err.status === 'WEBLINK_NOT_EXIST') {
              logger.info('Weblink does not exist')

              msg = 'Weblink is not linked to your account. If you think this is an error please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>.'
            } else {
              logger.error('Fatal error: _unlink', msg)

              msg = 'Sorry! We are unable to remove your weblink. If problem persists, please contact <a href=\"mailTo:support@topcoder.com\">support@topcoder.com</a>'
            }

            account.deletingAccount = false
            toaster.pop('error', 'Whoops!', msg)
          })
      }
    }
  }
})()
