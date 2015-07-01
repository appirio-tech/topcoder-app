/* jshint -W117, -W030 */
describe('Challenge Service', function() {
  var challengeData = mockData.getMockChallenge();
  var apiUrl = 'https://api.topcoder-dev.com/v2';

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$httpBackend', '$q', 'challenge');
  });

  it('exists', function() {
    expect(challenge).to.exist;
  });

  it('getChallengeDetails returns challenge information', function() {
    $httpBackend
      .when('GET', apiUrl + '/challenges/' + 123456)
      .respond(200, [{}]);

    challenge.getChallengeDetails(123456).then(function(data) {
      expect(data).to.exist;
    })
    $httpBackend.flush();
  });

  it('getChallengeDetails returns error information', function() {
    $httpBackend
      .when('GET', apiUrl + '/challenges/' + 123456)
      .respond(500, {message: 'there was an error'});

    challenge.getChallengeDetails(123456).catch(function(error) {
      expect(error.data.message).to.match(/error/);
    })
    $httpBackend.flush();
  });

});
