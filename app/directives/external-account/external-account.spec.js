import angular from 'angular'
import _ from 'lodash'

describe('External Accounts Directive', function() {
  var scope
  var element
  var toasterSvc
  var extAccountSvc
  var mockLinkedAccounts = [
    {
      provider: 'linkedin',
      data: {}
    },
    {
      provider: 'github',
      data: {}
    }
  ]

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, '$compile', '$rootScope', 'toaster', 'ExternalAccountService', '$q')

    extAccountSvc = ExternalAccountService
    // mock external account service
    sinon.stub(extAccountSvc, 'linkExternalAccount', function(provider) {
      var $deferred = $q.defer()
      if (provider === 'twitter') {
        $deferred.reject({
          status: 'SOCIAL_PROFILE_ALREADY_EXISTS',
          msg: 'profile already exists'
        })
      } else if(provider === 'weblink') {
        $deferred.reject({
          status: 'FATAL_ERROR',
          msg: 'fatal error'
        })
      } else {
        $deferred.resolve({
          status: 'SUCCESS',
          linkedAccount : {
            data: {
              status: 'PENDING'
            },
            provider: provider
          }
        })
      }
      return $deferred.promise
    })
    sinon.stub(extAccountSvc, 'unlinkExternalAccount', function(provider) {
      var $deferred = $q.defer()
      if (provider === 'twitter') {
        $deferred.reject({
          status: 'SOCIAL_PROFILE_NOT_EXIST',
          msg: 'profile not exists'
        })
      } else if(provider === 'weblink') {
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

    scope = $rootScope.$new()
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('Linked external accounts', function() {
    var linkedAccounts = angular.copy(mockLinkedAccounts)

    beforeEach(function() {
      scope.linkedAccounts = linkedAccounts
      element = angular.element('<external-accounts linked-accounts="linkedAccounts"></external-accounts>)')
      $compile(element)(scope)
      scope.$digest()

      element.controller('externalAccounts')
    })

    afterEach(function() {
      linkedAccounts = angular.copy(mockLinkedAccounts)
      scope.linkedAccounts = linkedAccounts
    })

    it('should have added account list to scope', function() {
      expect(element.isolateScope().accountList).to.exist
    })

    it('should have "linked" property set for github & linkedin', function() {
      var githubAccount = _.find(element.isolateScope().accountList, function(a) {
        return a.provider === 'github'
      })
      expect(githubAccount).to.have.property('status').that.equals('linked')
    })

    it('should have pending status for stackoverflow ', function() {
      scope.linkedAccounts.push({provider: 'stackoverflow', data: {status: 'PENDING'}})
      scope.$digest()
      var soAccount = _.find(element.isolateScope().accountList, function(a) {
        return a.provider === 'stackoverflow'
      })
      expect(soAccount).to.have.property('status').that.equals('pending')
    })

    it('should reset accountList when linkedAccounts set to null ', function() {
      scope.linkedAccounts = null
      scope.$digest()
      expect(element.isolateScope().accountList).to.have.length(7)
      expect(_.all(_.pluck(element.isolateScope().accountList, 'status'))).to.be.false
    })

    it('should link external account ', function() {
      element.isolateScope().handleClick('stackoverflow', 'unlinked')
      scope.$digest()
      expect(toasterSvc.pop).to.have.been.calledWith('success').calledOnce
      expect(element.isolateScope().linkedAccounts).to.have.length(3)
      expect(element.isolateScope().accountList).to.have.length(7)
      element.isolateScope().accountList.forEach(function(account) {
        expect(account.status).to.exist
        expect(account.provider).to.exist
        if (['github', 'linkedin'].indexOf(account.provider) != -1) {
          expect(account.status).to.equal('linked')
        } else if (['stackoverflow'].indexOf(account.provider) != -1) {
          expect(account.status).to.equal('pending')
        } else {
          expect(account.status).to.equal('unlinked')
        }
      })
    })

    it('should NOT link external account with fatal error ', function() {
      element.isolateScope().handleClick('weblink', 'unlinked')
      scope.$digest()
      expect(toasterSvc.pop).to.have.been.calledWith('error').calledOnce
      expect(element.isolateScope().linkedAccounts).to.have.length(2)
      expect(element.isolateScope().accountList).to.have.length(7)
      element.isolateScope().accountList.forEach(function(account) {
        expect(account.status).to.exist
        expect(account.provider).to.exist
        if (['github', 'linkedin'].indexOf(account.provider) != -1) {
          expect(account.status).to.equal('linked')
        } else {
          expect(account.status).to.equal('unlinked')
        }
      })
    })

    it('should NOT link external account with already existing account ', function() {
      element.isolateScope().handleClick('twitter', 'unlinked')
      scope.$digest()
      expect(toasterSvc.pop).to.have.been.calledWith('error').calledOnce
      expect(element.isolateScope().linkedAccounts).to.have.length(2)
      expect(element.isolateScope().accountList).to.have.length(7)
      element.isolateScope().accountList.forEach(function(account) {
        expect(account.status).to.exist
        expect(account.provider).to.exist
        if (['github', 'linkedin'].indexOf(account.provider) != -1) {
          expect(account.status).to.equal('linked')
        } else {
          expect(account.status).to.equal('unlinked')
        }
      })
    })

    it('should unlink external account ', function() {
      element.isolateScope().handleClick('github', 'linked')
      scope.$digest()
      expect(toasterSvc.pop).to.have.been.calledWith('success').calledOnce
      expect(element.isolateScope().linkedAccounts).to.have.length(1)
      expect(element.isolateScope().accountList).to.have.length(7)
      element.isolateScope().accountList.forEach(function(account) {
        expect(account.status).to.exist
        expect(account.provider).to.exist
        if (['linkedin'].indexOf(account.provider) != -1) {
          expect(account.status).to.equal('linked')
        } else {
          expect(account.status).to.equal('unlinked')
        }
      })
    })

    it('should unlink if controller doesn\'t have account linked but API returns success ', function() {
      element.isolateScope().handleClick('stackoverflow', 'linked')
      scope.$digest()
      expect(toasterSvc.pop).to.have.been.calledWith('success').calledOnce
      expect(element.isolateScope().linkedAccounts).to.have.length(2)
      expect(element.isolateScope().accountList).to.have.length(7)
      element.isolateScope().accountList.forEach(function(account) {
        expect(account.status).to.exist
        expect(account.provider).to.exist
        if (['github', 'linkedin'].indexOf(account.provider) != -1) {
          expect(account.status).to.equal('linked')
        } else {
          expect(account.status).to.equal('unlinked')
        }
      })
    })

    it('should NOT ulink external account with fatal error ', function() {
      element.isolateScope().handleClick('weblink', 'linked')
      scope.$digest()
      expect(toasterSvc.pop).to.have.been.calledWith('error').calledOnce
      expect(element.isolateScope().linkedAccounts).to.have.length(2)
      expect(element.isolateScope().accountList).to.have.length(7)
      element.isolateScope().accountList.forEach(function(account) {
        expect(account.status).to.exist
        expect(account.provider).to.exist
        if (['github', 'linkedin'].indexOf(account.provider) != -1) {
          expect(account.status).to.equal('linked')
        } else {
          expect(account.status).to.equal('unlinked')
        }
      })
    })

    it('should NOT unlink external account with already unlinked account ', function() {
      element.isolateScope().handleClick('twitter', 'linked')
      scope.$digest()
      expect(toasterSvc.pop).to.have.been.calledWith('error').calledOnce
      expect(element.isolateScope().linkedAccounts).to.have.length(2)
      expect(element.isolateScope().accountList).to.have.length(7)
      element.isolateScope().accountList.forEach(function(account) {
        expect(account.status).to.exist
        expect(account.provider).to.exist
        if (['github', 'linkedin'].indexOf(account.provider) != -1) {
          expect(account.status).to.equal('linked')
        } else {
          expect(account.status).to.equal('unlinked')
        }
      })
    })

    it('should not do anything ', function() {
      element.isolateScope().handleClick('github', 'pending')
      scope.$digest()
      expect(toasterSvc.pop).to.have.callCount(0)
      expect(element.isolateScope().linkedAccounts).to.have.length(2)
      expect(element.isolateScope().accountList).to.have.length(7)
      element.isolateScope().accountList.forEach(function(account) {
        expect(account.status).to.exist
        expect(account.provider).to.exist
        if (['github', 'linkedin'].indexOf(account.provider) != -1) {
          expect(account.status).to.equal('linked')
        } else {
          expect(account.status).to.equal('unlinked')
        }
      })
    })

  })
})
