/* jshint -W117, -W030 */
describe.only('External Accounts Directive', function() {
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
        providerType: 'linkedin',
        // don't care about other details
      },
      {
        providerType: 'github'
      }
    ];
    var linksData = {
      'linkedin' : {provider: 'linkedin', name: 'name-linkedin'},
      'github' : {provider: 'github', name: 'name-github'}
    };
    var externalAccounts;

    beforeEach(function() {
      scope.linkedAccounts = linkedAccounts;
      scope.linksData = linksData;
      element = angular.element('<external-accounts linked-accounts="linkedAccounts", links-data="linksData"></external-accounts>)');
      externalAccounts = $compile(element)(scope);
      scope.$digest();
      // scope.$apply();
    });

    it('should have added account list to scope', function() {
      expect(element.isolateScope().accountList).to.exist;

    });

    it('should have "linked" property set for github & linkedin', function() {
      var githubAccount = _.find(element.isolateScope().accountList, function(a) { return a.provider === 'github'});
      expect(githubAccount).to.have.property('status')
        .that.equals('linked');

      // var linkeindAccount = _.find(element.isolateScope().accountList, function(a) { return a.provider === 'linkedin'});
      // expect(linkeindAccount).to.have.property('linked')
      //   .that.equals(true);
    });
  });
});

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
    var linkedAccounts = {
      github: {
        handle: "github-handle",
        followers: 1,
        publicRepos: 1
      },

      stackoverflow: {
        handle: 'so-handle',
        reputation: 2,
        answers: 2
      },
      behance: {
        name: 'behance name',
        projectViews: 3,
        projectAppreciations: 3
      },
      dribble: {
        handle: 'dribble-handle',
        followers: 4,
        likes: 4
      },
      bitbucket: {
        username: 'bitbucket-username',
        followers: 5,
        repositories: 5
      },
      twitter: {
        handle: 'twitter-handle',
        noOfTweets: 6,
        followers: 6
      },
      linkedin: {
        name: 'linkedin name',
        title: 'linkedin title'
      }
    };
    var externalLinksData;

    beforeEach(function() {
      scope.linkedAccounts = linkedAccounts;
      element = angular.element('<external-links-data linked-accounts-data="linkedAccounts"></external-links-data>)');
      externalLinksData = $compile(element)(scope);
      scope.$digest();
    });

    it('should have added linkedAccounts to scope', function() {
      expect(element.isolateScope().linkedAccounts).to.exist;
      expect(element.isolateScope().linkedAccounts).to.have.length(1);
    });

  });
});
