/* jshint -W117, -W030 */
describe('Profile Controller', function() {
  var controller;
  var apiUrl;
  var mockProfile = mockData.getMockProfile();
  var mockStats = mockData.getMockStats();
  var mockSkills = mockData.getMockSkills();
  var mockExternalLinks = mockData.getMockLinkedExternalAccounts();
  var mockExternalLinksData = mockData.getMockLinkedExternalAccountsData();

  beforeEach(function() {
    bard.appModule('tc.profile');
    bard.inject(this, '$controller', 'CONSTANTS', '$rootScope', '$q', 'ProfileService', 'ExternalAccountService');

    apiUrl = CONSTANTS.API_URL;

    var profileService = {
      getUserStats: function() {
        return $q.when({result: {content: mockStats}});
      },
      getUserSkills: function() {
        return $q.when({result: {content: mockSkills}});
      },
      getRanks: ProfileService.getRanks
    };

    var externalAccountService = {
      getLinkedExternalLinksData: function() {
        return $q.when(mockExternalLinksData);
      }
    }
    controller = $controller('ProfileCtrl', {
      userHandle: 'rakesh',
      profile: mockProfile,
      ProfileService: profileService,
      ExternalAccountService: externalAccountService
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be defined', function() {
    expect(controller).to.be.defined;
  });

  describe('after activation', function() {
    beforeEach(function() {
      $rootScope.$apply();
    });

    it('should have some properties', function() {
      expect(controller.userHandle).to.be.equal('rakesh');
      expect(controller.status).to.be.defined;
      expect(controller.statsPromise).to.be.defined;
      expect(controller.skillsPromise).to.be.defined;
      expect(controller.externalLinksPromise).to.be.defined;
    });

    it('should have default status', function() {
      expect(controller.status.badges).to.equal(CONSTANTS.STATE_LOADING);
      expect(controller.status.stats).to.equal(CONSTANTS.STATE_READY);
      expect(controller.status.skills).to.equal(CONSTANTS.STATE_READY);
      expect(controller.status.externalLinks).to.equal(CONSTANTS.STATE_LOADING);
    });
  });
});
