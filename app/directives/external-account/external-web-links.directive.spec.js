/* jshint -W117, -W030 */
describe('ExternalWebLinks Directive', function() {
  var scope = {};
  var element;
  var extWebLinkSvc;
  var toasterSvc;
  var mockLinkedAccounts = [
    {
      provider: 'github',
      data: {
        handle: "github-handle",
        followers: 1,
        publicRepos: 1
      }
    }
  ];

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope', 'ExternalWebLinksService', '$q', 'toaster');

    extWebLinkSvc = ExternalWebLinksService;

    // mock external weblink service
    sinon.stub(extWebLinkSvc, 'addLink', function(handle, url) {
      var $deferred = $q.defer();
      if (handle === 'throwError') {
        $deferred.reject({
          status: 'FATAL_ERROR',
          msg: 'fatal error'
        });
      } else if(handle === 'alreadyExistsError') {
        $deferred.reject({
          status: 'WEBLINK_ALREADY_EXISTS',
          msg: 'link already added to your account'
        });
      } else {
        $deferred.resolve({
          data: {
            status: 'PENDING'
          },
          provider: 'weblink'
        });
      }
      return $deferred.promise;
    });

    toasterSvc = toaster;
    bard.mockService(toaster, {
      pop: $q.when(true),
      default: $q.when(true)
    });

    scope = $rootScope.$new();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Linked external accounts', function() {
    var linkedAccounts = angular.copy(mockLinkedAccounts);
    var template, element, controller;

    beforeEach(function() {
      scope.linkedAccounts = linkedAccounts;
      element = angular.element('<external-web-link linked-accounts="linkedAccounts" user-handle="test1"></external-web-link>)');
      template = $compile(element)(scope);
      scope.$digest();

      controller = element.controller('externalWebLink');
    });

    afterEach(function() {
      linkedAccounts = angular.copy(mockLinkedAccounts);
      scope.linkedAccounts = linkedAccounts;
    });

    it('should have added linkedAccounts to scope', function() {
      expect(scope.linkedAccounts).to.exist;
      expect(scope.linkedAccounts).to.have.length(1);
    });

    it('should have added new weblink to linkedAccounts', function() {
      scope.userHandle = 'test';
      scope.url = 'https://www.topcoder.com';
      element.isolateScope().addWebLink();
      scope.$digest();
      expect(scope.linkedAccounts).to.have.length(2);
      var topcoderLink = _.find(scope.linkedAccounts, function(a) {
        return a.provider === 'weblink'
      });
      expect(topcoderLink).to.exist;
      expect(topcoderLink.status).to.exist.to.equal('PENDING');
      expect(element.isolateScope().url).not.to.exist;
      expect(toasterSvc.pop).to.have.been.calledWith('success').calledOnce;
    });

    it('should NOT add new weblink to linkedAccounts', function() {
      var urlToAdd = 'https://www.topcoder.com';
      element.isolateScope().userHandle = 'throwError';
      element.isolateScope().url = urlToAdd;
      element.isolateScope().addWebLink();
      scope.$digest();
      expect(scope.linkedAccounts).to.have.length(1);
      expect(element.isolateScope().url).to.exist.to.equal(urlToAdd);
      expect(toasterSvc.pop).to.have.been.calledWith('error').calledOnce;
    });

    it('should NOT add new weblink to linkedAccounts', function() {
      var urlToAdd = 'https://www.topcoder.com';
      element.isolateScope().userHandle = 'alreadyExistsError';
      element.isolateScope().url = urlToAdd;
      element.isolateScope().addWebLink();
      scope.$digest();
      expect(scope.linkedAccounts).to.have.length(1);
      expect(element.isolateScope().url).to.exist.to.equal(urlToAdd);
      expect(toasterSvc.pop).to.have.been.calledWith('error').calledOnce;
    });

  });
});
