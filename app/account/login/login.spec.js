/* jshint -W117, -W030 */
describe('Login Controller', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject('$controller', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('LoginController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(controller).to.be.defined;
  });

  it('should have a name property', function() {
    expect(controller.name).to.be.defined;
  });

  it('should have login as the name property', function() {
    expect(controller.name).to.equal('login');
  });
});
