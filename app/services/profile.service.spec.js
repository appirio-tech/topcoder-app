/* jshint -W117, -W030 */
describe('Profile Service', function() {
  var service;
  var mockProfile = mockData.getMockProfile();
  var mockStats = mockData.getMockStats();
  var apiUrl;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$httpBackend', 'ProfileService', '$rootScope', 'CONSTANTS');

    apiUrl  = CONSTANTS.API_URL;
    service = ProfileService;

    // mock profile api
    $httpBackend
      .when('GET', apiUrl + '/members/rakesh/')
      .respond(200, {result: {content: mockProfile}});
    // mock stats
    $httpBackend
      .when('GET', apiUrl + '/members/rakesh/stats/')
      .respond(200, {result: {content: mockStats}});

  });


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should return a profile', function() {
    service.getUserProfile('rakesh').then(function(profile) {
      expect(profile).to.be.defined;
    });
    $httpBackend.flush();
  });

  describe('stats', function() {
    it('should return stats', function() {
      service.getUserStats('rakesh').then(function(stats) {
        expect(stats).to.be.defined;
      });
      $httpBackend.flush();
    });

    it('should return ranks', function() {
      var ranks = service.getRanks(mockStats);
      expect(ranks.DEVELOP.length).to.be.equal(5);
    });

    it('should return subtrack stats', function() {
      var subtrackStats = service.getChallengeTypeStats(mockStats, 'develop', 'design');
      expect(subtrackStats.rank.rating).to.be.equal(2125);
    });

    it('should return a user\'s tracks', function() {
      var tracks = service.getTracks(mockStats);
      expect(tracks.length).to.be.equal(3);
    });

    it('should return subtracks', function() {
      var subtracks = service.getSubTracks(mockStats, 'develop');
      expect(subtracks.length).to.be.equal(11);
    });
  });

});
