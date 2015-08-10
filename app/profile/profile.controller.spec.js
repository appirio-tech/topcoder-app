/* jshint -W117, -W030 */
describe('Profile Controller', function() {
  var controller;
  var mockProfile = mockData.getMockProfile();
  var mockStats = mockData.getMockStats();
  var mockSkills = mockData.getMockSkills();
  var apiUrl = 'https://api.topcoder-dev.com/v3';

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.appModule('tc.profile');
    bard.inject(this, '$httpBackend', '$controller', 'CONSTANTS');

    controller = $controller('ProfileCtrl', {
      $scope: {},
      userHandle: 'rakesh',
      profile: mockProfile
    });


    // mock challenges
    $httpBackend
      .when('GET', new RegExp(apiUrl + '/challenges/.*'))
      .respond(200, {result: {content: []}});
    // mock stats
    $httpBackend
      .when('GET', apiUrl + '/members/rakesh/stats/')
      .respond(200, {result: {content: mockStats}});
    // mock skills
    $httpBackend
      .when('GET', apiUrl + '/members/rakesh/skills/')
      .respond(200, {result: {content: mockSkills}});
  });

  afterEach(function() {
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be defined', function() {
    expect(controller).to.be.defined;
  });

  it('should have some properties', function() {
    expect(controller.userHandle).to.be.equal('rakesh');
    expect(controller.status).to.be.defined;
    expect(controller.statsPromise).to.be.defined;
    expect(controller.pastChallengesPromise).to.be.defined;
    expect(controller.skillsPromise).to.be.defined;
  });

  it('should have tenure', function() {
    expect(controller.tenure).to.be.equal(14);
  });

  it('should have default status', function() {
    expect(controller.status.externalLinks).to.be.equal(CONSTANTS.STATE_READY);
  });

});
