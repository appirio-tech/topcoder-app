/* jshint -W117, -W030 */
describe('Challenge Service', function() {
  var challengeData = mockData.getMockChallenge();
  var apiUrl = 'https://api.topcoder-dev.com/v3';

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$httpBackend', 'ChallengeService');
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should exist', function() {
    expect(ChallengeService).to.exist;
  });

  it('getChallengeDetails returns challenge information', function() {
    $httpBackend
      .when('GET', apiUrl + '/challenges/' + 123456)
      .respond(200, [{}]);

    ChallengeService.getChallengeDetails(123456)
    .then(function(data) {
      expect(data).to.exist;
    })
    $httpBackend.flush();
  });

  it('getChallengeDetails returns error information', function() {
    $httpBackend
      .when('GET', apiUrl + '/challenges/' + 123456)
      .respond(500, {message: 'there was an error'});

    ChallengeService.getChallengeDetails(123456)
    .catch(function(error) {
      expect(error.data.message).to.match(/error/);
    })
    $httpBackend.flush();
  });

});
