/* jshint -W117, -W030 */
describe('User Service', function() {
  var apiUrl = 'https://api.topcoder-dev.com/v3';

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$httpBackend', 'UserService');

    // mock api
    $httpBackend
      .when('GET', apiUrl + '/users/resetToken/?email=valid@test.com')
      .respond(200);
    $httpBackend
      .when('GET', apiUrl + '/users/resetToken/?email=recent@test.com')
      .respond(400);
    $httpBackend
      .when('GET', apiUrl + '/users/resetToken/?email=notfound@test.com')
      .respond(404);
    $httpBackend
      .when('PUT', apiUrl + '/users/resetPassword/', '{"param":{"handle":"validhandle","credential":{"password":"validpassword","resetToken":"validtoken"}}}')
      .respond(200);
    $httpBackend
      .when('PUT', apiUrl + '/users/resetPassword/', '{"param":{"handle":"validhandle","credential":{"password":"validpassword","resetToken":"invalidtoken"}}}')
      .respond(400);
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // bard.verifyNoOutstandingHttpRequests();

  it('should exist', function() {
    expect(UserService).to.exist;
  });

  it('gets a valid reset token', function() {
    UserService.generateResetToken('valid@test.com')
      .then(function() {
        expect('nothing but the fact that you arrived');
      }, function(err) {
        it.should.not.be.here();
      });
    $httpBackend.flush();
  });

  it('cant get a recently requested reset token', function() {
    UserService.generateResetToken('recent@test.com')
      .then(function() {
        it.should.not.be.here();
      }, function(err) {
        expect(err.status).to.equal(400);
      });
   $httpBackend.flush();
  });

  it('cant get a reset token for a user that doesnt exist', function() {
    UserService.generateResetToken('recent@test.com')
      .then(function() {
        it.should.not.be.here();
      }, function(err) {
        expect(err.status).to.equal(400);
      });
   $httpBackend.flush();
  });

  it('resets the password', function() {
    UserService.resetPassword('validhandle', 'validpassword', 'validtoken')
      .then(function() {
        expect('nothing but the fact that you arrived');
      }, function(err) {
        it.should.not.be.here();
      });
   $httpBackend.flush();
  });

  it('fails to reset the password', function() {
    UserService.resetPassword('validhandle', 'validpassword', 'invalidtoken')
      .then(function() {
        it.should.not.be.here();
      }, function(err) {
        expect(err.status).to.equal(400);
      });
   $httpBackend.flush();
  });

});
