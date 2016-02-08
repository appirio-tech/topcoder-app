/*eslint no-undef:0*/
describe('External Link Deletion Controller', function() {
  var toasterSvc
  var extLinkSvc
  var mockLinkedAccounts = [
    {
      provider: 'github',
      data: {
        handle: 'github-handle',
        followers: 1,
        publicRepos: 1
      }
    },
    { provider: 'stackoverflow',
      data: {
        handle: 'so-handle',
        reputation: 2,
        answers: 2
      }
    },
    {
      provider: 'behance',
      data: {
        name: 'behance name',
        projectViews: 3,
        projectAppreciations: 3
      }
    },
    {
      provider: 'dribbble',
      data: {
        handle: 'dribbble-handle',
        followers: 4,
        likes: 4
      }
    },
    {
      provider: 'bitbucket',
      data: {
        username: 'bitbucket-username',
        followers: 5,
        repositories: 5
      }
    },
    {
      provider: 'twitter',
      data: {
        handle: 'twitter-handle',
        noOfTweets: 6,
        followers: 6
      }
    },
    {
      provider: 'linkedin',
      data: {
        status: 'pending'
      }
    },
    {
      provider: 'weblink',
      key: 'somekey'
    }
  ]
  var createController = function(toDelete, linkedAccounts) {
    return $controller('ExternalLinkDeletionController', {
      ExternalWebLinksService : extLinkSvc,
      toaster: toasterSvc,
      userHandle: 'test',
      account: toDelete,
      linkedAccountsData: linkedAccounts
    })
  }

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, '$compile', '$rootScope', 'toaster', 'ExternalWebLinksService', '$q', 'ngDialog', '$controller')

    extLinkSvc = ExternalWebLinksService

    sinon.stub(extLinkSvc, 'removeLink', function(handle, key) {
      var $deferred = $q.defer()
      if (key === 'throwNotExistsError') {
        $deferred.reject({
          status: 'WEBLINK_NOT_EXIST',
          msg: 'profile not exists'
        })
      } else if(key === 'throwFatalError') {
        $deferred.reject({
          status: 'FATAL_ERROR',
          msg: 'fatal error'
        })
      } else {
        $deferred.resolve({
          status: 'SUCCESS'
        })
      }
      return $deferred.promise
    })

    toasterSvc = toaster
    bard.mockService(toaster, {
      pop: $q.when(true),
      default: $q.when(true)
    })

    sinon.stub(ngDialog, 'open', function() {
      ngDialog.deferredClose = $q.defer()
      return { closePromise : ngDialog.deferredClose.promise }
    })
    sinon.stub(ngDialog, 'close', function() {
      ngDialog.deferredClose.resolve('closing')
      return
    })
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('Linked external accounts', function() {
    var linkedAccounts = null

    beforeEach(function() {
      linkedAccounts = angular.copy(mockLinkedAccounts)
    })

    afterEach(function() {
      linkedAccounts = angular.copy(mockLinkedAccounts)
    })

    it('should remove weblink ', function() {
      var toDelete = {key: 'somekey', provider: 'weblink'}
      var ctrl = createController(toDelete, linkedAccounts)
      ctrl.deleteAccount()
      $rootScope.$apply()
      expect(toasterSvc.pop).to.have.been.calledWith('success').calledOnce
      expect(linkedAccounts).to.have.length(7)
    })

    it('should show success if controller doesn\'t have weblink but API returns success ', function() {
      var toDelete = {key: 'somekey1', provider: 'weblink'}
      var ctrl = createController(toDelete, linkedAccounts)
      ctrl.deleteAccount()
      $rootScope.$apply()
      expect(toasterSvc.pop).to.have.been.calledWith('success').calledOnce
      expect(linkedAccounts).to.have.length(8)
    })

    it('should NOT remove weblink with fatal error ', function() {
      var toDelete = {key: 'throwFatalError', provider: 'weblink'}
      var ctrl = createController(toDelete, linkedAccounts)
      ctrl.deleteAccount()
      $rootScope.$apply()
      expect(toasterSvc.pop).to.have.been.calledWith('error', 'Whoops!', sinon.match('Sorry!')).calledOnce
      expect(linkedAccounts).to.have.length(8)
    })

    it('should NOT remove weblink with already removed weblink ', function() {
      var toDelete = {key: 'throwNotExistsError', provider: 'weblink'}
      var ctrl = createController(toDelete, linkedAccounts)
      ctrl.deleteAccount()
      $rootScope.$apply()
      expect(toasterSvc.pop).to.have.been.calledWith('error', 'Whoops!', sinon.match('not linked')).calledOnce
      expect(linkedAccounts).to.have.length(8)
    })

    it('should not do any thing when already a deletion is in progress ', function() {
      var toDelete = {key: 'somekey', provider: 'weblink', deletingAccount: true}
      var ctrl = createController(toDelete, linkedAccounts)
      ctrl.deleteAccount()
      $rootScope.$apply()
      expect(extLinkSvc.removeLink).not.to.be.called
      expect(toasterSvc.pop).not.to.be.called
      expect(linkedAccounts).to.have.length(8)
    })

    it('should not do any thing for non weblink provider ', function() {
      var toDelete = {key: 'somekey', provider: 'stackoverflow'}
      var ctrl = createController(toDelete, linkedAccounts)
      ctrl.deleteAccount()
      $rootScope.$apply()
      expect(extLinkSvc.removeLink).not.to.be.called
      expect(toasterSvc.pop).not.to.be.called
      expect(linkedAccounts).to.have.length(8)
    })

  })
})
