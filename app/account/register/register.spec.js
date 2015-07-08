/* jshint -W117, -W030 */
describe('Register Controller', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('topcoder');
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

});
