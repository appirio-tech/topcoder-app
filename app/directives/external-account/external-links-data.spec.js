/*eslint no-undef:0*/
import angular from 'angular'

describe('External Links Data Directive', function() {
  var scope
  var element
  var ngDialogSvc
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

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, '$compile', '$rootScope', '$q', 'ngDialog')
    scope = $rootScope.$new()

    ngDialogSvc = ngDialog
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
      scope.linkedAccounts = linkedAccounts
      element = angular.element('<external-links-data linked-accounts-data="linkedAccounts" user-handle="test"></external-links-data>)')
      $compile(element)(scope)
      scope.$digest()
    })

    afterEach(function() {
      linkedAccounts = angular.copy(mockLinkedAccounts)
      scope.linkedAccounts = linkedAccounts
    })

    it('should have added linkedAccounts to scope', function() {
      expect(element.isolateScope().linkedAccountsData).to.exist
      expect(element.isolateScope().linkedAccountsData).to.have.length(8)
    })

    it('should open the confirmation popup ', function() {
      var account = {key: 'somekey', provider: 'weblink'}
      element.isolateScope().confirmDeletion(account)
      scope.$digest()
      // should open the popup
      expect(ngDialogSvc.open).to.be.called
      // should not remove anything from the array of accounts/links
      expect(element.isolateScope().linkedAccountsData).to.have.length(8)
      // $scope.deletionDialog should exist
      expect(element.isolateScope().deletionDialog).to.exist
      ngDialogSvc.close()
    })

    it('should NOT open the popup for pending state card ', function() {
      var account = {key: 'somekey', provider: 'weblink', status: 'PENDING'}
      element.isolateScope().confirmDeletion(account)
      scope.$digest()
      // should NOT open the popup
      expect(ngDialogSvc.open).not.to.be.called
      // should not remove anything from the array of accounts/links
      expect(element.isolateScope().linkedAccountsData).to.have.length(8)
      // $scope.deletionDialog should not exist
      expect(element.isolateScope().deletionDialog).not.to.exist
    })

    it('should NOT open the popup for non weblink external link ', function() {
      var account = {key: 'somekey', provider: 'stackoverflow'}
      element.isolateScope().confirmDeletion(account)
      scope.$digest()
      // should NOT open the popup
      expect(ngDialogSvc.open).not.to.be.called
      // should not remove anything from the array of accounts/links
      expect(element.isolateScope().linkedAccountsData).to.have.length(8)
      // $scope.deletionDialog should not exist
      expect(element.isolateScope().deletionDialog).not.to.exist
    })

  })
})
