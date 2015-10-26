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
        // don't care about other details
      },
      {
        provider: 'github'
      }
    ];
    var externalAccounts;

    beforeEach(function() {
      scope.linkedAccounts = linkedAccounts;
      element = angular.element('<external-accounts linked-accounts="linkedAccounts"></external-accounts>)');
      externalAccounts = $compile(element)(scope);
      // externalAccounts.scope().$digest();
      // externalAccounts.scope().$apply();
    });

    it('should have added account list to scope', function() {
      inject(function($timeout) {
        scope.$digest();
        $timeout(function() {
          expect(element.isolateScope().accountList).to.exist;
        }, 0)
      });
    });

    it('should have "linked" property set for github & linkedin', function() {
      inject(function($timeout) {
        scope.$digest();
        $timeout(function() {
          var githubAccount = _.find(element.isolateScope().accountList, function(a) { return a.provider === 'github'});
          expect(githubAccount).to.have.property('status').that.equals('linked');
        }, 0)
      });

      // var linkeindAccount = _.find(element.isolateScope().accountList, function(a) { return a.provider === 'linkedin'});
      // expect(linkeindAccount).to.have.property('linked')
      //   .that.equals(true);
    });
  });
});
