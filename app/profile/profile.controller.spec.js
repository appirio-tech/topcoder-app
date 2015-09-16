/* jshint -W117, -W030 */
describe('Profile Controller', function() {
  var controller;
  var apiUrl;
  var mockProfile = mockData.getMockProfile();
  var mockStats = mockData.getMockStats();
  var mockSkills = mockData.getMockSkills();

  beforeEach(function() {
    bard.appModule('tc.profile');
    bard.inject(this, '$controller', 'CONSTANTS', '$rootScope', '$q', 'ProfileService');

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

    controller = $controller('ProfileCtrl', {
      userHandle: 'rakesh',
      profile: mockProfile,
      ProfileService: profileService
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
    });

    it('should have default status', function() {
      expect(controller.status.externalLinks).to.equal(CONSTANTS.STATE_READY);
    });
  });
});
