/* jshint -W117, -W030 */
describe('External Links Data Directive', function() {
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
      }
    ];
    var externalLinksData;

    beforeEach(function() {
      scope.linkedAccounts = linkedAccounts;
      element = angular.element('<external-links-data linked-accounts-data="linkedAccounts"></external-links-data>)');
      externalLinksData = $compile(element)(scope);
      scope.$digest();
    });

    it('should have added linkedAccounts to scope', function() {
      expect(element.isolateScope().linkedAccountsData).to.exist;
      expect(element.isolateScope().linkedAccountsData).to.have.length(7);
    });

  });
});
