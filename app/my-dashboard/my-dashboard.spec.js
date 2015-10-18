/* jshint -W117, -W030 */
describe('Dashboard Controller', function() {
  var controller, identity, profileService;
  var mockProfile = mockData.getMockProfile();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$controller', '$q');

    profileService = {
      getUserProfile: function() {
        return $q.when({result: {content: mockProfile}});
      }
    };
  });

  identity = function() {
    return {
      handle: 'albertwang',
      userId: 123456
    };
  };

  bard.verifyNoOutstandingHttpRequests();

  beforeEach(function() {
    controller = $controller('MyDashboardController', {
      userIdentity: identity,
      ProfileService: profileService
    });
  });

  it('should exist', function() {
    expect(controller).to.exist;
    expect(controller.isCopilot).to.equal(false);
  });
});
