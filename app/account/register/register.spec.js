/* jshint -W117, -W030 */
describe('Register Controller', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('tc.account');
    bard.inject('$controller', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('RegisterController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(controller).to.be.defined;
  });

  it('should have a name property', function() {
    expect(controller.name).to.be.defined;
  });

  it('should have register as the name property', function() {
    expect(controller.name).to.equal('register');
  });
});
