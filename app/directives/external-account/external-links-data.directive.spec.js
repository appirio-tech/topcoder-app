/* jshint -W117, -W030 */
describe('External Links Data Directive', function() {
  var scope;
  var element;
  var toasterSvc, extLinkSvc, ngDialogSvc;
  var mockLinkedAccounts = [
    {
      provider: 'github',
      data: {
        handle: "github-handle",
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
  ];

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope', 'toaster', 'ExternalWebLinksService', '$q', 'ngDialog');
    scope = $rootScope.$new();

    extLinkSvc = ExternalWebLinksService;

    sinon.stub(extLinkSvc, 'removeLink', function(handle, key) {
      var $deferred = $q.defer();
      if (key === 'throwNotExistsError') {
        $deferred.reject({
          status: 'WEBLINK_NOT_EXIST',
          msg: 'profile not exists'
        });
      } else if(key === 'throwFatalError') {
        $deferred.reject({
          status: 'FATAL_ERROR',
          msg: 'fatal error'
        });
      } else {
        $deferred.resolve({
          status: 'SUCCESS'
        });
      }
      return $deferred.promise;
    });

    toasterSvc = toaster;
    bard.mockService(toaster, {
      pop: $q.when(true),
      default: $q.when(true)
    });

    ngDialogSvc = ngDialog;
    sinon.stub(ngDialog, 'open', function() {
      ngDialog.deferredClose = $q.defer();
      return { closePromise : ngDialog.deferredClose.promise };
    });
    sinon.stub(ngDialog, 'close', function() {
      ngDialog.deferredClose.resolve('closing');
      return 
    })
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Linked external accounts', function() {
    var linkedAccounts = null;
    var externalLinksData;

    beforeEach(function() {
      linkedAccounts = angular.copy(mockLinkedAccounts);
      scope.linkedAccounts = linkedAccounts;
      element = angular.element('<external-links-data linked-accounts-data="linkedAccounts" user-handle="test"></external-links-data>)');
      externalLinksData = $compile(element)(scope);
      scope.$digest();
    });

    afterEach(function() {
      linkedAccounts = angular.copy(mockLinkedAccounts);
      scope.linkedAccounts = linkedAccounts;
    });

    it('should have added linkedAccounts to scope', function() {
      expect(element.isolateScope().linkedAccountsData).to.exist;
      expect(element.isolateScope().linkedAccountsData).to.have.length(8);
    });

    it('should remove weblink ', function() {
      element.isolateScope().toDelete = {key: 'somekey', provider: 'weblink'};
      element.isolateScope().deleteAccount();
      scope.$digest();
      expect(toasterSvc.pop).to.have.been.calledWith('success').calledOnce;
      expect(element.isolateScope().linkedAccountsData).to.have.length(7);
    });

    it('should show success if controller doesn\'t have weblink but API returns success ', function() {
      element.isolateScope().toDelete = {key: 'somekey1', provider: 'weblink'};
      element.isolateScope().deleteAccount();
      scope.$digest();
      expect(toasterSvc.pop).to.have.been.calledWith('success').calledOnce;
      expect(element.isolateScope().linkedAccountsData).to.have.length(8);
    });

    it('should NOT remove weblink with fatal error ', function() {
      element.isolateScope().toDelete = {key: 'throwFatalError', provider: 'weblink'};
      element.isolateScope().deleteAccount();
      scope.$digest();
      expect(toasterSvc.pop).to.have.been.calledWith('error', "Whoops!", sinon.match('Sorry!')).calledOnce;
      expect(element.isolateScope().linkedAccountsData).to.have.length(8);
    });

    it('should NOT remove weblink with already removed weblink ', function() {
      element.isolateScope().toDelete = {key: 'throwNotExistsError', provider: 'weblink'};
      element.isolateScope().deleteAccount();
      scope.$digest();
      expect(toasterSvc.pop).to.have.been.calledWith('error', "Whoops!", sinon.match('not linked')).calledOnce;
      expect(element.isolateScope().linkedAccountsData).to.have.length(8);
    });

    it('should not do any thing when already a deletion is in progress ', function() {
      element.isolateScope().toDelete = {key: 'somekey', provider: 'weblink', deletingAccount: true};
      element.isolateScope().deleteAccount();
      scope.$digest();
      expect(extLinkSvc.removeLink).not.to.be.called;
      expect(toasterSvc.pop).not.to.be.called;
      expect(element.isolateScope().linkedAccountsData).to.have.length(8);
    });

    it('should not do any thing for non weblink provider ', function() {
      element.isolateScope().toDelete = {key: 'somekey', provider: 'stackoverflow'};
      element.isolateScope().deleteAccount();
      scope.$digest();
      expect(extLinkSvc.removeLink).not.to.be.called;
      expect(toasterSvc.pop).not.to.be.called;
      expect(element.isolateScope().linkedAccountsData).to.have.length(8);
    });

    it('should mark the account for deletion and open the popup ', function() {
      var account = {key: 'somekey', provider: 'stackoverflow'};
      element.isolateScope().confirmDeletion(account);
      scope.$digest();
      // just to cross check that it does not call removal service directly
      expect(extLinkSvc.removeLink).not.to.be.called;
      // should open the popup
      expect(ngDialogSvc.open).to.be.called;
      // should not remove anythign from the array of accounts/links
      expect(element.isolateScope().linkedAccountsData).to.have.length(8);
      // $scope.toDelete should point to account passed to the confirmDeletion method
      expect(element.isolateScope().toDelete).to.exist;
      expect(element.isolateScope().toDelete.key).to.exist.to.equal(account.key);
      expect(element.isolateScope().toDelete.provider).to.exist.to.equal(account.provider);
      ngDialogSvc.close();
    });

    it('should call closePromise after popup closing ', function() {
      var account = {key: 'somekey', provider: 'stackoverflow'};
      element.isolateScope().confirmDeletion(account);
      scope.$digest();
      // should open the popup
      expect(ngDialogSvc.open).to.be.called;
      // should not remove anythign from the array of accounts/links
      expect(element.isolateScope().linkedAccountsData).to.have.length(8);
      // $scope.toDelete should point to account passed to the confirmDeletion method
      expect(element.isolateScope().toDelete).to.exist;
      expect(element.isolateScope().toDelete.key).to.exist.to.equal(account.key);
      expect(element.isolateScope().toDelete.provider).to.exist.to.equal(account.provider);
      // adds resolve listener to the closePromise of ngDialog to verify that closePromise 
      // has been called after closing the ngDialog
      ngDialogSvc.deferredClose.promise.then(function() {
        // should reset scope.toDelete to null
        expect(element.isolateScope().toDelete).to.null;
      });
      // close dialog and resolve closePromise
      ngDialogSvc.close();
    });

  });
});
