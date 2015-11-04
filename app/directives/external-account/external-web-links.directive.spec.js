/* jshint -W117, -W030 */
describe('ExternalWebLinks Directive', function() {
  var scope = {};
  var element;
  var extWebLinkSvc;
  var toasterSvc;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope', 'ExternalWebLinksService', '$q', 'toaster');

    extWebLinkSvc = ExternalWebLinksService;
    bard.mockService(extWebLinkSvc, {
      addLink: $q.when({title: 'blah'}),
      default: $q.when({})
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
    var linkedAccounts = [
      {
        provider: 'github',
        data: {
          handle: "github-handle",
          followers: 1,
          publicRepos: 1
        }
      }
    ];
    var template, element, controller;

    beforeEach(function() {
      scope.linkedAccounts = linkedAccounts;
      element = angular.element('<external-web-link linked-accounts="linkedAccounts" user-handle="test1"></external-web-link>)');
      template = $compile(element)(scope);
      scope.$digest();

      controller = element.controller('externalWebLink');
    });

    it('should have added linkedAccounts to scope', function() {
      expect(scope.linkedAccounts).to.exist;
      expect(scope.linkedAccounts).to.have.length(1);
    });

    it('should have added new weblink to linkedAccounts', function() {
      scope.userHandle = 'test';
      scope.url = 'https://www.topcoder.com';
      controller.addWebLink();
      scope.$digest();
      expect(extWebLinkSvc.addLink).to.have.been.calledOnce;
      expect(controller.linkedAccounts).to.have.length(2);
      expect(toasterSvc.pop).to.have.been.calledOnce;
    })

  });
});
