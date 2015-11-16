/* jshint -W117, -W030 */
describe('External Accounts Directive', function() {
  var scope;
  var element;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope');
    scope = $rootScope.$new();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Linked external accounts', function() {
    var linkedAccounts = [
      {
        provider: 'linkedin',
        data: {
          // don't care about other details
        }
      },
      {
        provider: 'github',
        data: {
          // don't care about other details
        }
      }
    ];
    var externalAccounts;

    beforeEach(function() {
      scope.linkedAccounts = linkedAccounts;
      element = angular.element('<external-accounts linked-accounts="linkedAccounts"></external-accounts>)');
      externalAccounts = $compile(element)(scope);
      scope.$digest();
    });

    it('should have added account list to scope', function() {
      expect(element.isolateScope().accountList).to.exist;
    });

    it('should have "linked" property set for github & linkedin', function() {
      var githubAccount = _.find(element.isolateScope().accountList, function(a) {
        return a.provider === 'github'
      });
      expect(githubAccount).to.have.property('status').that.equals('linked');
    });

    it('should have pending status for stackoverflow ', function() {
      scope.linkedAccounts.push({provider: 'stackoverflow', data: {status: 'PENDING'}});
      scope.$digest();
      var soAccount = _.find(element.isolateScope().accountList, function(a) {
        return a.provider === 'stackoverflow'
      });
      expect(soAccount).to.have.property('status').that.equals('pending');
    });
  });
});
